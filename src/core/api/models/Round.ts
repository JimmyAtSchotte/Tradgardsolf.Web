import Course from '../entities/Course';
import Player from '../entities/Player';
import RoundScore from './RoundScore';

export default class Round {
    public course: Course | undefined;
    public players: RoundScore[] | undefined;

    constructor(course: Course, players: Player[]) {
        this.course = course;

        this.players = [];

        players.forEach((player) => {
            this.players.push(new RoundScore(player, course.holes));
        });
    }
}