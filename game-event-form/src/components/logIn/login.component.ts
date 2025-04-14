import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { provider } from "../../main";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

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

    private auth = getAuth();

    constructor(private router: Router, private authService : AuthService) {}

    onSignUpWithGoogle() {
        signInWithPopup(this.auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if(credential !== null) {
                    const token = credential.accessToken;

                    if(token) {
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
            signInWithEmailAndPassword(this.auth, this.form.controls["email"].value || "", this.form.controls["password"].value || "")
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.authService.authenticate(user).then((authenticated)=> {
                        if(authenticated) {
                            this.router.navigate(['/new-game'])
                        }
                    });
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