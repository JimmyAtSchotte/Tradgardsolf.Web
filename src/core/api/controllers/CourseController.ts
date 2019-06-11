import IApi from '@/core/interfaces/IApi';
import Course from '@/core/api/entities/Course';

export default class CourseController {
    private readonly api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    public async GetHasPlayedOnCourses(): Promise<Course[]> {
       return await this.api.getAsync<Course[]>('api/course/GetHasPlayedOnCourses');
    }

    public async GetHasNotPlayedOnCourses(): Promise<Course[]> {
        return await this.api.getAsync<Course[]>('api/course/GetHasNotPlayedOnCourses');
     }

     public async GetCoursesWithDistance(latitude: number, longitude: number): Promise<Course[]> {
         return await this.api.getAsync<Course[]>(`api/course/GetCoursesWithDistance?latitude=${latitude}&longitude=${longitude}`);
     }
}
