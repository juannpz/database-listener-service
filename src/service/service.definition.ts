export interface ServiceConfig {
    dbConfig: DatabaseConfig;
    brokerConfig: BrokerConfig;
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