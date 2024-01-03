export interface registerResponseInterface {
    message: string;
    email: string;
}

export interface loginResponseInterface {
    access_token: string;
    refresh_token: string;
}