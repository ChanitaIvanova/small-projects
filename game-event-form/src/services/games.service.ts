import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGameModel } from '../models/game.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private http = inject(HttpClient);

    constructor(private authService: AuthService) { }

    createGame(game: IGameModel): Observable<any> {
        return this.http.post('https://us-central1-game-event-form-b9544.cloudfunctions.net/createGame', game, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authService.getAuthToken()}`
            }
        });
    }
}