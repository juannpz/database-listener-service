import { NotificationManager } from "./notificationManager/NotificationManager.ts";
import { DatabaseClient } from "../database/DatabaseClient.ts";
import { ServiceConfig } from "../service.definition.ts";
import { BrokerClient } from "../broker/BrokerClient.ts";

export async function initManager(config: ServiceConfig) {
	const databaseClient = new DatabaseClient(config.dbConfig);
	const brokerClient = new BrokerClient(config.brokerConfig);
	const notifificationManager = new NotificationManager(databaseClient, brokerClient);

    await notifificationManager.init();
    await brokerClient.init();
}