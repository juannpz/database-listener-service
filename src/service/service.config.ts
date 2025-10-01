import { BrokerConfig, DatabaseConfig, ServiceConfig } from "./service.definition.ts";
import { checkEnv } from '@juannpz/deno-service-tools';

export function getConfig() {
    const config: ServiceConfig = {
        dbConfig: getDatabaseConfig(),
        brokerConfig: getBrokerConfig()
    };
    
    return checkEnv(config);
}

function getDatabaseConfig(): DatabaseConfig {
    return {
        DB_HOST: Deno.env.get("DB_HOST") ?? "",
        DB_PORT: parseInt(Deno.env.get("DB_PORT") ?? ""),
        DB_USER: Deno.env.get("DB_USER") ?? "",
        DB_PASSWORD: Deno.env.get("DB_PASSWORD") ?? "",
        DB_NAME: Deno.env.get("DB_NAME") ?? ""
    };
}

function getBrokerConfig(): BrokerConfig {
    return {
        BROKER_HOST: Deno.env.get("BROKER_HOST") ?? "",
        BROKER_PORT: parseInt(Deno.env.get("BROKER_PORT") ?? ""),
        BROKER_CLIENT_ID: Deno.env.get("BROKER_CLIENT_ID") ?? ""
    };
}