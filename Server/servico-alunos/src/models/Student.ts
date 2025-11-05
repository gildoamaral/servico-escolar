import { randomUUID as uuid } from "crypto";

// Nos models, criamos os objetos de fato. Seguimos a lógica definida no
// prisma.schema

export class Student {
  public readonly id: string;
  public name: string;
  public email: string;
  public readonly createdAt: Date;

  constructor( name: string, email: string, id?: string, createdAt?: Date ) {
    this.name = name;
    this.email = email;
    this.id = id ?? uuid();
    this.createdAt = createdAt ?? new Date();
  }
}
