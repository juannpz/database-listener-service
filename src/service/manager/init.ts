import { NotificationManager } from "./notificationManager/NotificationManager.ts";
import { DatabaseClient } from "../database/DatabaseClient.ts";
import { ServiceConfig } from "../service.definition.ts";
import { BrokerClient } from "../broker/BrokerClient.ts";
import { ServiceTokenManager } from "@juannpz/deno-service-tools";

export async function initManager(config: ServiceConfig) {
    const databaseClient = new DatabaseClient(config.dbConfig);
    const brokerClient = new BrokerClient(config.brokerConfig);
    const notifificationManager = new NotificationManager(
        databaseClient,
        brokerClient,
        config.servicesEntrypoints,
    );

    await brokerClient.init();

    await notifificationManager.init();

    await ServiceTokenManager.init({
        userId: config.authConfig.SERVICE_AUTH_USER_ID,
        role: config.authConfig.SERVICE_AUTH_ROLE,
        publicKey: config.authConfig.SERVICE_AUTH_PUBLIC_KEY,
    }, config.servicesEntrypoints.SESSION_SERVICE);
}
