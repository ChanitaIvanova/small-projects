import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  constructor() { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }
  private authenticatedSubject: Subject<boolean> = new Subject<boolean>();
  authenticated$: Observable<boolean> = this.authenticatedSubject.asObservable();
  
  authenticate(user: User): Promise<boolean> {
    return user.getIdToken().then((result) => {
        localStorage.setItem(this.authSecretKey, result);
        this.isAuthenticated = true;
        this.emitAuthenticatedStatus();
        return true;
    });
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.emitAuthenticatedStatus();
  }

  private emitAuthenticatedStatus(): void {
    this.authenticatedSubject.next(this.isAuthenticated);
  }
}