import Vue from 'vue';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import IApi from '@/core/interfaces/IApi';


export default class Api implements IApi {
    private readonly api: AxiosInstance;

    private BASE_URL: any = {
        production: '/',
        development: 'https://localhost:44318/',
    };

    private config: AxiosRequestConfig = {
        baseURL: this.BASE_URL[process.env.NODE_ENV],
        withCredentials: true,
    };

    constructor() {
        this.api = axios.create(this.config);
    }

    public async postAsync<T>(url: string, data: any): Promise<T> {
        const response = await this.api.post<T>(url, data);
        return response.data;
    }

    public post(url: string, data: any): void {
       this.api.post(url, data);
    }

    public async getAsync<T>(url: string, data: any = null): Promise<T> {
        const request = this.config;
        request.params = data;

        const response = await this.api.get<T>(url, request);
        return response.data;
    }

    public get(url: string): void {
        this.api.get(url);
    }
}
