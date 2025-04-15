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

  getAuthToken(): string | null {
    return localStorage.getItem(this.authSecretKey);
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.emitAuthenticatedStatus();
  }

  private emitAuthenticatedStatus(): void {
    this.authenticatedSubject.next(this.isAuthenticated);
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<User> {
    const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).then(cred => cred.user);
  }

  async signUpWithEmailAndPassword(email: string, password: string): Promise<User> {
    const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password).then(cred => cred.user);
  }

  async signInWithGoogle(): Promise<User> {
    const { getAuth, signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth();
    return signInWithPopup(auth, provider).then(result => result.user);
  }
}