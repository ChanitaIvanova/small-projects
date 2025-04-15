import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { getAuth } from "firebase/auth";
import { matchValidator } from "../../validators/match.validator";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'sign-up',
    templateUrl: './signUp.component.html',
    styleUrl: './signUp.component.scss',
    standalone: false
})
export class SignUp {
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            Validators.minLength(8),
            Validators.maxLength(25),]),
        confirmPassword: new FormControl('', [Validators.required, matchValidator('password')])
    })
    error = '';

    private auth = getAuth();

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
                const user = await this.authService.signUpWithEmailAndPassword(email, password);
                if (user) {
                    this.authService.authenticate(user).then((authenticated) => {
                        if (authenticated) {
                            this.router.navigate(['/new-game'])
                        }
                    });
                }
            } catch (error: any) {
                switch(error.code) {
                    case "auth/email-already-in-use":
                        this.error = "This email already has an account.";
                        break;
                    default:
                        this.error = "Something went wrong. Please try again later";
                }
                console.error(error);
            }
        }
    }
}