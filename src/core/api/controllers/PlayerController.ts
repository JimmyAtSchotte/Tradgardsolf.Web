import IApi from '@/core/interfaces/IApi';
import Player from '@/core/api/entities/Player';
import Course from '@/core/api/entities/Course';

export default class PlayerController {
    private readonly api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    public async GetPlayersThatHasPlayedOnCourse(course: Course): Promise<Player[]> {
       return await this.api.getAsync<Player[]>(`api/player/GetPlayersThatHasPlayedOnCourse?courseId=${course.id}`);
    }
}
