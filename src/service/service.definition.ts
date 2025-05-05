export interface IServiceConfig {
    dbConfig: IDatabaseConfig;
    brokerConfig: IBrokerConfig;
}

export interface IDatabaseConfig {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
}

export interface IBrokerConfig {
    BROKER_HOST: string;
    BROKER_PORT: number;
    BROKER_CLIENT_ID: string;
}