export default interface IApi{
    postAsync<T>(url: string, data: any): Promise<T>;
    post(url: string, data: any): void;
    getAsync<T>(url: string, data?: any): Promise<T>;
    get(url: string): void;
}
