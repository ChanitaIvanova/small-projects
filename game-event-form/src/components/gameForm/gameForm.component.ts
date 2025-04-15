import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IGameModel } from "../../models/game.model"
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import moment from "moment";
import { MY_DATE_FORMATS } from "../../config/date-formats";
import { AuthService } from "../../services/auth.service";
import { GamesService } from "../../services/games.service";

@Component({
  selector: 'game-form',
  templateUrl: './gameForm.component.html',
  styleUrl: './gameForm.component.scss',
  providers: [provideMomentDateAdapter(MY_DATE_FORMATS, { useUtc: true })],
  standalone: false
})
export class GameForm {

  @Input() isEditMode = false;
  game: IGameModel = {
    title: "",
    date: moment(new Date(), 'DD/MM/YYYY'),
    location: "",
    maxPlayers: 1
  }

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl(moment(new Date(), 'DD/MM/YYYY'), Validators.required),
    location: new FormControl('', Validators.required),
    maxPlayers: new FormControl(1, Validators.required),
  })

  error: string = "";

  constructor(private authService: AuthService, private gamesService: GamesService) { }

  async onSubmit() {
    if (this.form.valid) {

      if (this.authService.isAuthenticatedUser()) {
        this.gamesService.createGame({
          title: this.form.controls["title"].value || "",
          date: this.form.controls["date"].value || moment(new Date(), 'DD/MM/YYYY'),
          location: this.form.controls["location"].value || "",
          maxPlayers: this.form.controls["maxPlayers"].value || 0,
        }).subscribe((response) => {
          console.log(response);
        }, (error) => {
          console.error(error);
        });
      } else {
        console.log("User not authenticated");
      }
    }
  }
}