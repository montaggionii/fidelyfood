import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {}

  // 🔹 Crear cliente
  async addCliente(cliente: any) {
    const clientesRef = collection(this.firestore, 'clientes');
    const docRef = await addDoc(clientesRef, cliente);
    return { id: docRef.id, ...cliente };
  }

  // 🔹 Obtener todos los clientes
  async getClientes() {
    const clientesRef = collection(this.firestore, 'clientes');
    const snapshot = await getDocs(clientesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // 🔹 Actualizar un cliente
  async updateCliente(id: string, data: any) {
    const clienteDoc = doc(this.firestore, 'clientes', id);
    await updateDoc(clienteDoc, data);
  }

  // 🔹 Eliminar un cliente
  async deleteCliente(id: string) {
    const clienteDoc = doc(this.firestore, 'clientes', id);
    await deleteDoc(clienteDoc);
  }
}