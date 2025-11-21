import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) {}

  // Observable del usuario
  get user$(): Observable<User | null> {
    return new Observable(observer => {
      this.auth.onAuthStateChanged(user => observer.next(user));
    });
  }

  // Login
  login(data: { email: string, password: string }): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, data.email, data.password))
      .pipe(rxMap((cred: any) => cred.user));
  }

  // Logout
  async logout() {
    try {
      await signOut(this.auth);
      console.log('Sesión cerrada');
      this.router.navigate(['/auth'], { replaceUrl: true });
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }

  // Registro
  register(data: { name: string, email: string, password: string }): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, data.email, data.password)
        .then(userCred => {
          sendEmailVerification(userCred.user);
          return userCred.user;
        })
    );
  }
}