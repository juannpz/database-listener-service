import {
    BrokerConfig,
    DatabaseConfig,
    ServiceAuthConfig,
    ServiceConfig,
    ServicesEntrypoints,
} from "./service.definition.ts";
import { checkEnv } from "@juannpz/deno-service-tools";

function getConfig() {
    const config: ServiceConfig = {
        dbConfig: getDatabaseConfig(),
        brokerConfig: getBrokerConfig(),
        servicesEntrypoints: getServicesEntrypoints(),
        authConfig: getServiceAuthConfig(),
    };

    return checkEnv(config);
}

function getDatabaseConfig(): DatabaseConfig {
    return {
        DB_HOST: Deno.env.get("DB_HOST") ?? "",
        DB_PORT: parseInt(Deno.env.get("DB_PORT") ?? ""),
        DB_USER: Deno.env.get("DB_USER") ?? "",
        DB_PASSWORD: Deno.env.get("DB_PASSWORD") ?? "",
        DB_NAME: Deno.env.get("DB_NAME") ?? "",
    };
}

function getBrokerConfig(): BrokerConfig {
    return {
        BROKER_HOST: Deno.env.get("BROKER_HOST") ?? "",
        BROKER_PORT: parseInt(Deno.env.get("BROKER_PORT") ?? ""),
        BROKER_CLIENT_ID: Deno.env.get("BROKER_CLIENT_ID") ?? "",
    };
}

function getServicesEntrypoints(): ServicesEntrypoints {
    return {
        CRUD_SERVICE: Deno.env.get("CRUD_SERVICE") ?? "",
        SESSION_SERVICE: Deno.env.get("SESSION_SERVICE") ?? "",
    };
}

function getServiceAuthConfig(): ServiceAuthConfig {
    return {
        SERVICE_AUTH_USER_ID: Deno.env.get("SERVICE_AUTH_USER_ID") ?? "",
        SERVICE_AUTH_ROLE: Deno.env.get("SERVICE_AUTH_ROLE") ?? "",
        SERVICE_AUTH_PUBLIC_KEY: Deno.env.get("SERVICE_AUTH_PUBLIC_KEY") ?? "",
    };
}

export const SERVICE_CONFIG = getConfig();
