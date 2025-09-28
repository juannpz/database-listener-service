import { NotificationManager } from "./notificationManager/NotificationManager.ts";
import { DatabaseClient } from "../database/DatabaseClient.ts";
import { IServiceConfig } from "../service.definition.ts";
import { BrokerClient } from "../broker/BrokerClient.ts";

export async function initManager(config: IServiceConfig) {
	const databaseClient = new DatabaseClient(config.dbConfig);
	const brokerClient = new BrokerClient(config.brokerConfig);
	const notifificationManager = new NotificationManager(databaseClient, brokerClient);

    await notifificationManager.init();
    await brokerClient.init();
}