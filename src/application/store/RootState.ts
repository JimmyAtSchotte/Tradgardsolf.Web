import AuthorizedPlayer from '@/core/api/entities/AuthorizedPlayer';
import Course from '@/core/api/entities/Course';

export default class RootState {
    public authorizedPlayer: AuthorizedPlayer = null;
    public hasPlayedOnCourses: Course[] = null;
    public hasNotPlayedOnCourses: Course[] = null;
  }

