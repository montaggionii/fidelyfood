import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  reload,
  signOut,
  updateProfile,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) {}

  // Observador de usuario autenticado
  get user$(): Observable<User | null> {
    return new Observable(observer => {
      this.auth.onAuthStateChanged(user => observer.next(user));
    });
  }

  // LOGIN
  login(data: { email: string; password: string }): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, data.email, data.password)).pipe(
      switchMap(async cred => {
        await reload(cred.user); // refrescar datos
        return cred.user;        // devolver usuario final
      })
    );
  }

  // REGISTRO
  register(data: { name: string; email: string; password: string }): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, data.email, data.password)
        .then(async userCred => {
          await updateProfile(userCred.user, { displayName: data.name });
          await sendEmailVerification(userCred.user);
          return userCred.user;
        })
    );
  }

  // LOGOUT
  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/auth'], { replaceUrl: true });
  }

  // Obtener nombre del usuario
  getUserName(user: User | null): string {
    return user?.displayName || user?.email?.split('@')[0] || 'Usuario';
  }
}