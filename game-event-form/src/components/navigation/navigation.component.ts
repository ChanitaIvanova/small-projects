import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { getAuth, signOut } from "firebase/auth";
import { Router } from "@angular/router";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    standalone: false
})
export class Navigation {
    isAuthenticated = false;
    constructor(private router: Router, private authService: AuthService) {
        this.isAuthenticated = this.authService.isAuthenticatedUser();
        authService.authenticated$.subscribe(authenticated => {
            this.isAuthenticated = authenticated;
        })
    }

    logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            this.authService.logout();
            this.router.navigate(["/login"]);
        }).catch((error) => {
            console.error(error);
        });
    }
}