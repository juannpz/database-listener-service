import { NOTIFICATION_CHANNEL } from "./database.definition.ts";
import { DatabaseConfig } from "../service.definition.ts";
import postgres from '@postgres';

export class DatabaseClient {
    public client: postgres.Sql | null = null;
	private config: DatabaseConfig;

    public constructor(config: DatabaseConfig) {
		this.config = config;
	}

    public async init(listenerCb: (payload: string) => Promise<void>) {
        this.client = postgres({
            database: this.config.DB_NAME,
            hostname: this.config.DB_HOST,
            port: this.config.DB_PORT,
            user: this.config.DB_USER,
            password: this.config.DB_PASSWORD
        });

        await this.stablishListener(listenerCb);
    }

    public async stablishListener(listenerCb: (payload: string) => Promise<void>) {
        if (!this.client)
            throw new Error("Postgres client not initialized");

        await this.client.listen(NOTIFICATION_CHANNEL, listenerCb);

        console.log(`Listening through channel: ${NOTIFICATION_CHANNEL}`);
    }

    public async disconnect() {
        if (!this.client)
            throw new Error("Postgres client not initialized");

        await this.client.end();
    }
}