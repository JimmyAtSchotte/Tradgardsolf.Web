import AuthorizedPlayer from '@/core/api/entities/AuthorizedPlayer';
import Course from '@/core/api/entities/Course';

export default class RootState {
    public authorizedPlayer: AuthorizedPlayer | undefined;
    public hasPlayedOnCourses: Course[] | undefined;
    public hasNotPlayedOnCourses: Course[] | undefined;
  }