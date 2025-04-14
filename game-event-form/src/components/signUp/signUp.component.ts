import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { matchValidator } from "../../validators/match.validator";
import { provider } from "../../main";
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

    onSignUpWithGoogle() {
        signInWithPopup(this.auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if(credential !== null) {
                    const token = credential.accessToken;
                    const userEmail = result.user.email;

                    if(token && userEmail) {
                        this.authService.authenticate(result.user).then((authenticated)=> {
                            if(authenticated) {
                                this.router.navigate(['/new-game'])
                            }
                        });
                    }
                }
            }).catch((error) => {
                this.error = error.message;
                console.error(error)
            });
    }

    onSubmit() {
        if (this.form.valid) {
            createUserWithEmailAndPassword(this.auth, this.form.controls["email"].value || "", this.form.controls["password"].value || "")
                .then((userCredential) => {
                    const user = userCredential.user;
                    if(user) {
                        this.authService.authenticate(user).then((authenticated)=> {
                            if(authenticated) {
                                this.router.navigate(['/new-game'])
                            }
                        });
                    }
                })
                .catch((error) => {
                    switch(error.code) {
                        case "auth/email-already-in-use":
                            this.error = "This email already has an account.";
                            break;
                        default:
                            this.error = "Something went wrong. Please try again later";
                    }
                    console.error(error);
                });
        }
    }
}