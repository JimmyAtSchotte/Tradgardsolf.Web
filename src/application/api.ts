import store from '@/application/store/';
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

    public async postAsync<TResult, TModel>(url: string, data: TModel): Promise<TResult> {
        let result: TResult = null;

        await this.api.post<TResult>(url, data).then((response) => result = response.data)
            .catch((error) => this.onError(error));

        return result;
    }
    public post<TModel>(url: string, data: TModel): void {
        this.api.post(url, data).catch((error) => this.onError(error));
    }
    public async getAsync<TResult, TModel>(url: string, data?: TModel): Promise<TResult> {
        let result: TResult = null;

        await this.api.get<TResult>(url, data).then((response) => result = response.data)
            .catch((error) => this.onError(error));

        return result;
    }

    public get(url: string): void {
        this.api.get(url).catch((error) => this.onError(error));
    }

    protected onError(error: any): void {
        if (error.response.status === 401) {
            store.current.commit('resetState');
        }
    }
}
