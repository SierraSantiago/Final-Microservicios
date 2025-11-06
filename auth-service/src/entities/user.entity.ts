/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla

import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('text', {
        array: true,
        default: ['network-admins'],
    })
    roles: string[];

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column({
        type: 'decimal',
        default: 0,
    })
    daemonScore: number;


}
