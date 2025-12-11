// src/app/models/ticket.model.ts
import { User } from './user.model';

export class Ticket {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public usuario?: User
  ) {}

  toString(): string {
    return `${this.nombre} - ${this.descripcion} - $${this.precio}` +
           (this.usuario ? ` - Usuario: ${this.usuario.nombre}` : '');
  }
}