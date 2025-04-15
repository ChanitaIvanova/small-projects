import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { GeneralError } from "../generalError/generalError.component";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class Login {
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })
    error = '';

    constructor(private router: Router, private authService : AuthService) {}

    async onSignUpWithGoogle() {
        try {
            const user = await this.authService.signInWithGoogle();
            if (user) {
                this.authService.authenticate(user).then((authenticated) => {
                    if (authenticated) {
                        this.router.navigate(['/new-game']);
                    }
                });
            }
        } catch (error: any) {
            this.error = error.message || 'Google sign-in failed.';
            console.error(error);
        }
    }

    async onSubmit() {
        if (this.form.valid) {
            const email = this.form.controls["email"].value || "";
            const password = this.form.controls["password"].value || "";
            try {
                const user = await this.authService.loginWithEmailAndPassword(email, password);
                this.authService.authenticate(user).then((authenticated) => {
                    if (authenticated) {
                        this.router.navigate(['/new-game']);
                    }
                });
            } catch (error: any) {
                switch(error.code) {
                    case "auth/email-already-in-use":
                        this.error = "This email already has an account.";
                        break;
                    case "auth/user-not-found":
                        this.error = "No user found with this email.";
                        break;
                    case "auth/invalid-credential":
                        this.error = "Invalid credentials";
                        break;
                    default:
                        this.error = "Something went wrong. Please try again later";
                }
                console.error(error);
            }
        }
    }
}