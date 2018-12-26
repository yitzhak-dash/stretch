import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string = '';

    @Column({select: false})
    password?: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean = false;
}
