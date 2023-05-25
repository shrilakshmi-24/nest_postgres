import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Add the @Entity decorator to define it as an entity
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string; // Fix the typo in the property name

  @Column()
  age: number;
}
