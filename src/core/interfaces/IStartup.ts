export default interface IStartup {
    configureServices(): void;
    configureModules(): void;
    configureComponents(): void;
    run(): void
}