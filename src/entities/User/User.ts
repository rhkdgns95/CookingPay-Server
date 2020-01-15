import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, OneToMany } from "typeorm";
import Post from "../Post/Post";
import Donation from "../Donation/Donation";
import { IsEmail } from "class-validator";

@Entity('users')
class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;
    
    @Column('text')
    @IsEmail()
    email: string;
    
    @Column('text')
    password: string;
    
    @OneToMany(type => Post, post => post.writer)
    posts: Post[];

    @OneToMany(type => Donation, donation => donation.post)
    donations: Donation[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
};

export default User;