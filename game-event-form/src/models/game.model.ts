export interface IGameModel {
    title: string;
    date: Date;
    location: string;
    maxPlayers: number;
}

class GameModel implements IGameModel {
    public title: string;
    public date: Date;
    public location: string;
    public maxPlayers: number;

    constructor(game: IGameModel) {
        this.title = game.title;
        this.date = game.date;
        this.location = game.location;
        this.maxPlayers = game.maxPlayers;
    }
}