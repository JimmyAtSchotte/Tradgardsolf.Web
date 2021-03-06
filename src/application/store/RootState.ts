
import Player from '@/core/api/entities/Player';
import Course from '@/core/api/entities/Course';
import Round from '@/core/api/models/Round';

export default class RootState {
    public authorizedPlayer: Player = null;
    public courses: Course[] = [] as Course[];
    public selectedCourse: Course = null;
    public selectedPlayers: Player[] = [] as Player[];
    public currentRound: Round = null;
  }

