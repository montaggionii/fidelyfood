// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

// Interfaz de datos de cada usuario
export interface UserData {
  favorites: any[];
  points: number;
  tips: string[];
  email?: string;
  name?: string;
}

// Interfaz para obtener todos los usuarios
export interface AllUsers {
  uid: string;
  data: UserData;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private auth: Auth) {}

  // Observable con datos del usuario autenticado
  getUserData(): Observable<UserData | null> {
    return new Observable(observer => {
      this.auth.onAuthStateChanged(async (user: User | null) => {
        if (user) {
          const userDoc = doc(this.firestore, `users/${user.uid}`);
          const data = await getDoc(userDoc);
          if (data.exists()) {
            observer.next(data.data() as UserData);
          } else {
            // Si no existe, crear un documento inicial
            const initialData: UserData = {
              favorites: [],
              points: 0,
              tips: [],
              email: user.email || '',
              name: user.displayName || ''
            };
            await setDoc(userDoc, initialData);
            observer.next(initialData);
          }
        } else {
          observer.next(null);
        }
      });
    });
  }

  // Obtener todos los usuarios de la colección 'users'
  getAllUsers(): Observable<AllUsers[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection, { idField: 'uid' }) as Observable<AllUsers[]>;
  }

  // Actualizar puntos del usuario
  async updatePoints(uid: string, points: number) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    await updateDoc(userDoc, { points });
  }

  // Actualizar favoritos del usuario
  async updateFavorites(uid: string, favorites: any[]) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    await updateDoc(userDoc, { favorites });
  }

  // Actualizar tips del usuario
  async updateTips(uid: string, tips: string[]) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    await updateDoc(userDoc, { tips });
  }

  // Crear un usuario manualmente (opcional)
  async createUser(uid: string, data: UserData) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    await setDoc(userDoc, data);
  }
}