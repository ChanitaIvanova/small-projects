import { Moment } from "moment";
import moment from "moment";
export interface IGameModel {
    title: string;
    date: Moment;
    location: string;
    maxPlayers: number;
}

export class Game implements IGameModel {
    public title = "";
    public date = moment();
    public location = "";
    public maxPlayers = 0;

    constructor(game: IGameModel) {
        if (game) {
            this.title = game.title;
            this.date = game.date;
            this.location = game.location;
            this.maxPlayers = game.maxPlayers;
        }
    }

    isValid(): boolean {
        return !!this.title && !!this.date && !!this.location && !!this.maxPlayers;
    }
}
