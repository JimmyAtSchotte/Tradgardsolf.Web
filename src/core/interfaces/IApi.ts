export default interface IApi {
    postAsync<TResult, TModel>(url: string, data: TModel): Promise<TResult>;
    post<TModel>(url: string, data: TModel): void;
    getAsync<TResult, TModel = {}>(url: string, data?: TModel): Promise<TResult>;
    get(url: string): void;
}
