import { Notification, TableName } from "./notificationManager.definition.ts";
import { DatabaseClient } from "../../database/DatabaseClient.ts";
import { BrokerClient } from "../../broker/BrokerClient.ts";

export class NotificationManager {
	private databaseClient: DatabaseClient;
	private brokerClient: BrokerClient;

    public constructor(databaseClient: DatabaseClient, brokerClient: BrokerClient) {
		this.databaseClient = databaseClient;
		this.brokerClient = brokerClient;
    }

    public async init() {
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
        
            default:
                return;
        }
    }

}