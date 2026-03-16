import { Action, Notification, TableName } from "./notificationManager.definition.ts";
import { DatabaseClient } from "../../database/DatabaseClient.ts";
import { BrokerClient } from "../../broker/BrokerClient.ts";
import { buildRequestResponse, safeFetch, ServiceTokenManager } from "@juannpz/deno-service-tools";
import { ServicesEntrypoints } from "../../service.definition.ts";
import { buildAuthHeaders } from "../../utils/request.util.ts";

export class NotificationManager {
    private databaseClient: DatabaseClient;
    private brokerClient: BrokerClient;
    private services: ServicesEntrypoints;

    public constructor(
        databaseClient: DatabaseClient,
        brokerClient: BrokerClient,
        services: ServicesEntrypoints,
    ) {
        this.databaseClient = databaseClient;
        this.brokerClient = brokerClient;
        this.services = services;
    }

    public async init() {
        await this.brokerClient.createTopics(Object.values(TableName));

        await this.databaseClient.init(this.processNotification.bind(this));
    }

    private async processNotification(payload: string) {
        const parsedPayload = JSON.parse(payload) as Notification;

        console.log(">> Got notification from database");

        console.log(parsedPayload);

        await this.brokerClient.sendMessage(parsedPayload);

        switch (parsedPayload.table) {
            case TableName.USERS:
                return;

            case TableName.USER_CREDENTIALS:
                return;

            case TableName.USER_STATUS:
                return;

            case TableName.INVENTORY_TRANSACTIONS: {
                if (
                    parsedPayload.action !== Action.INSERT || !parsedPayload.new_values ||
                    !parsedPayload.products
                ) {
                    return;
                }

                const productId = parsedPayload.new_values.product_id;
                const transactionQuantity = Number(parsedPayload.new_values.quantity);
                const currentStock = Number(parsedPayload.products.current_stock);

                const newCalculatedStock = currentStock + transactionQuantity;

                const getTokenResult = await ServiceTokenManager.getValidToken();

                if (!getTokenResult.ok) {
                    const response = buildRequestResponse(getTokenResult);

                    console.error(response.message, response.detail);

                    return;
                }

                const updateProductsResponse = await safeFetch(
                    fetch(`${this.services.CRUD_SERVICE}/v1/crud/product/${productId}`, {
                        method: "PATCH",
                        headers: {
                            ...buildAuthHeaders(""),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            current_stock: newCalculatedStock,
                        }),
                    }),
                );

                if (!updateProductsResponse.ok) {
                    const response = buildRequestResponse(updateProductsResponse);
                    console.error(response.message, response.detail);
                } else {
                    console.log(
                        `Successfully updated stock for product ${productId} to ${newCalculatedStock}`,
                    );
                }

                return;
            }

            default:
                return;
        }
    }
}
