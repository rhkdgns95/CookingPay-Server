import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, OneToMany, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm";
import Post from "../Post/Post";
import Donation from "../Donation/Donation";
import { IsEmail } from "class-validator";
import bcrypt from "bcryptjs";
import PublicMessage from "../Message/PublicMessage";
import Chat from "../Chat/Chat";
import PrivateMessage from "../Message/PrivateMessage";

@Entity('users')
class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;
    
    @Column('text')
    @IsEmail(undefined, { message: "잘못된 이메일 형식입니다." })
    email: string;
    
    @Column('text')
    password: string;
    
    @OneToMany(type => Post, post => post.writer)
    posts: Post[];

    @OneToMany(type => Donation, donation => donation.post)
    donations: Donation[];

    @OneToMany(type => PublicMessage, publicMessages => publicMessages.writer)
    publicMessages: PublicMessage[];

    @OneToMany(tpe => PrivateMessage, privateMessage => privateMessage.user)
    privateMessages: PrivateMessage[];

    @ManyToMany(type => Chat, chat => chat.users)
    @JoinTable()
    chats: Chat[];

    public comparePassword = (password: string) => bcrypt.compareSync(password, this.password);
    private hashPassword = (password: string) => bcrypt.hashSync(password);

    @BeforeInsert()
    @BeforeUpdate()
    savePassword = () => {
        if(this.password) {
            const hashedPassword = this.hashPassword(this.password);
            this.password = hashedPassword;
        }
    }

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
};

export default User;