import { NotificationManager } from "./notificationManager/NotificationManager.ts";
import { IServiceConfig } from "../service.definition.ts";
import { BrokerClient } from "../broker/BrokerClient.ts";

export async function initManager(config: IServiceConfig) {
    await NotificationManager.init(config.dbConfig);

    await BrokerClient.init(config.brokerConfig);
}