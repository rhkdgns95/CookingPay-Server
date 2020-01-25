import { BaseEntity, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from "typeorm";
import User from "../User/User";
import PrivateMessage from "../Message/PrivateMessage";

@Entity()
class Chat extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => User, user => user.chats)
    users: User[];

    @OneToMany(type => PrivateMessage, privateMessage => privateMessage.chat)
    privateMessages: PrivateMessage[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
};

export default Chat;