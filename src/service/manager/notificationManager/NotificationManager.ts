import { Notification, TableName } from "./notificationManager.definition.ts";
import { DatabaseClient } from "../../database/DatabaseClient.ts";
import { IDatabaseConfig } from "../../service.definition.ts";
import { BrokerClient } from "../../broker/BrokerClient.ts";

export class NotificationManager extends DatabaseClient {

    private constructor() {
        super();
    }

    public static async init(config: IDatabaseConfig) {
        await this._init(config, this.processNotification);
    }
    
    private static async processNotification(payload: string) {
        const parsedPayload = JSON.parse(payload) as Notification;

        console.log(">> Got notification from database");

        console.log(parsedPayload);

        await BrokerClient.sendMessage(parsedPayload);
        
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