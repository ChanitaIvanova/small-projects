import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { GameForm } from '../components/gameForm/gameForm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { Navigation } from '../components/navigation/navigation.component';
import { routes } from './app.routes';
import { SignUp } from '../components/signUp/signUp.component';
import { Login } from '../components/logIn/login.component';
import { GeneralError } from '../components/generalError/generalError.component';
import { provideHttpClient } from '@angular/common/http';
import { SuccessMessage } from '../components/successMessage/successMessage.component';

@NgModule({
    declarations: [AppComponent, GameForm, SignUp, Login, Navigation],
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MatSlideToggleModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatButtonModule,
        ReactiveFormsModule,
        GeneralError,
        SuccessMessage
    ],
    providers: [provideRouter(routes), provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule { }