export default class Player {
    public id: number | undefined;
    public email: string | undefined;
    public name: string | undefined;
    public created: Date | undefined;

    constructor() {
        this.id = undefined;
        this.email = undefined;
        this.name = undefined;
        this.created = undefined;
    }
}