import Player from './Player';

export default class Course {
    public id: number | undefined;
    public name: string | undefined;
    public holes: number | undefined;
    public longitude: number | undefined;
    public latitude: number | undefined;
    public distance: number | undefined;
    public createdBy: Player | undefined;
    public created: Date | undefined;
    public hasPlayedOnCourse: boolean | undefined;

    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.holes = undefined;
        this.distance = undefined;
        this.longitude = undefined;
        this.latitude = undefined;
        this.createdBy = undefined;
        this.created = undefined;
        this.hasPlayedOnCourse = undefined;
    }
}
