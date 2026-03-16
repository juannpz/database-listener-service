export interface ServiceConfig {
    dbConfig: DatabaseConfig;
    brokerConfig: BrokerConfig;
    servicesEntrypoints: ServicesEntrypoints;
    authConfig: ServiceAuthConfig;
}

export interface DatabaseConfig {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
}

export interface BrokerConfig {
    BROKER_HOST: string;
    BROKER_PORT: number;
    BROKER_CLIENT_ID: string;
}

export interface ServicesEntrypoints {
    CRUD_SERVICE: string;
    SESSION_SERVICE: string;
}

export interface ServiceAuthConfig {
    SERVICE_AUTH_USER_ID: string;
    SERVICE_AUTH_ROLE: string;
    SERVICE_AUTH_PUBLIC_KEY: string;
}
