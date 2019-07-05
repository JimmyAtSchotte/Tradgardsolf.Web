import Player from '../entities/Player';

export default class RoundScore {
    public player: Player | undefined;
    public scores: number[]| undefined;

    constructor(player: Player, holes: number) {
        this.player = player;
        this.scores = new Array<number>(holes);
    }
}