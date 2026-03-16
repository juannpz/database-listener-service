export interface BaseNotification {
    table: TableName;
    action: Action;
}

interface UsersNotification extends BaseNotification {
    table: TableName.USERS;
}

interface UserCredentialsNotification extends BaseNotification {
    table: TableName.USER_CREDENTIALS;
}

interface UserStatusNotification extends BaseNotification {
    table: TableName.USER_STATUS;
}

interface InventoryTransactionsNotification extends BaseNotification {
    table: TableName.INVENTORY_TRANSACTIONS;
    products: {
        name: string;
        min_stock: number;
        current_stock: number;
    };
    new_values: {
        user_id: number | null;
        quantity: number;
        product_id: string;
        movement_type: string;
    };
    transaction_id: string;
}

export type Notification =
    | UsersNotification
    | UserCredentialsNotification
    | UserStatusNotification
    | InventoryTransactionsNotification;

export enum TableName {
    USERS = "users",
    USER_CREDENTIALS = "user_credentials",
    USER_STATUS = "user_status",
    INVENTORY_TRANSACTIONS = "inventory_transactions",
}

export enum Action {
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}
