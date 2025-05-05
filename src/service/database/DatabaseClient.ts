import postgres from 'https://deno.land/x/postgresjs@v3.4.5/mod.js';
import { NOTIFICATION_CHANNEL } from "./database.definition.ts";
import { IDatabaseConfig } from "../service.definition.ts";

export class DatabaseClient {
    protected static client: postgres.Sql | null = null;

    protected constructor() { }

    public static async _init(config: IDatabaseConfig, listenerCb: (payload: string) => Promise<void>) {
        this.client = postgres({
            database: config.DB_NAME,
            hostname: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD
        });

        await this.stablishListener(listenerCb);
    }

    protected static async stablishListener(listenerCb: (payload: string) => Promise<void>) {
        if (!this.client)
            throw new Error("Postgres client not initialized");

        await this.client.listen(NOTIFICATION_CHANNEL, listenerCb);

        console.log(`Listening through channel: ${NOTIFICATION_CHANNEL}`);
    }

    protected static async disconnect() {
        if (!this.client)
            throw new Error("Postgres client not initialized");

        await this.client.end();
    }
}