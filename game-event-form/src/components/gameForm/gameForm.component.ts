import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {IGameModel} from "../../models/game.model"
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import moment from "moment";
import { MY_DATE_FORMATS } from "../../config/date-formats";

@Component({
    selector: 'game-form',
    templateUrl: './gameForm.component.html',
    styleUrl: './gameForm.component.scss',
    providers: [ provideMomentDateAdapter(MY_DATE_FORMATS, {useUtc: true})],
    standalone: false
})
  export class GameForm {

    @Input() isEditMode = false;
    game: IGameModel = {
      title: "",
      date: moment(new Date(), 'DD/MM/YYYY').toDate(),
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

    onSubmit() {
      console.log(this.form.controls["date"].value);
    }

    private validate() {
      if(this.game.title.length === 0) {
        this.error = "Name is required";
      }
    }
  }