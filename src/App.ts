import IStartup from './core/interfaces/IStartup';

export default class App {
    private readonly startup: IStartup;

    constructor(startup: IStartup){
        this.startup = startup;
    }

    public run(): void {
        this.startup.configureServices();
        this.startup.configureComponents();
        this.startup.configureModules();
        this.startup.run();
    }
}