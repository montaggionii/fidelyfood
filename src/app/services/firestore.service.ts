import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  collectionData,
  docData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  // Puntos del usuario
  getUserPoints(uid: string): Observable<any> {
    const ref = doc(this.firestore, `users/${uid}/info/points`);
    return docData(ref);
  }

  // Favoritos del usuario
  getFavorites(uid: string): Observable<any[]> {
    const ref = collection(this.firestore, `users/${uid}/favorites`);
    return collectionData(ref, { idField: 'id' });
  }

  // Tips del usuario
  getTips(uid: string): Observable<any[]> {
    const ref = collection(this.firestore, `users/${uid}/tips`);
    return collectionData(ref, { idField: 'id' });
  }
}