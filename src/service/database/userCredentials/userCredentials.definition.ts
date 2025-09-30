
export interface UserCredentials {
    identity_id: number;
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    phone_number: Record<string, unknown>;
    metadata: Record<string, unknown>;
    created_at: Date;
    updated_at: Date;
}

export enum UserCredentialsColumn {
    IDENTITY_ID = "identity_id",
    USER_ID = "user_id",
    EMAIL = "email",
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    PASSWORD = "password",
    PHONE_NUMBER = "phone_number",
    METADATA = "metadata",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at"
}