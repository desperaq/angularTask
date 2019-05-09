import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    constructor() { }
    public readonly LOCAL_STORAGE_TOKEN_NAME = 'token_id';
    public readonly LOCAL_STORAGE_USER_NAME = 'username';
    public readonly HTTP_ROOT_URL: string;
    public readonly HTTP_API_ROOT_URL: string;

    public readonly HTTP_API_URL_AUTH = 'authenticate';
    public readonly HTTP_API_URL_REFRESH = 'refresh';

    public readonly JWT_AUTH_BEARER_KEYWORD = 'Bearer ';
}
