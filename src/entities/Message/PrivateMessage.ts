import { Entity, ManyToOne, Column } from "typeorm";
import CommonMessage from "./CommonMessage";
import Chat from "../Chat/Chat";
import User from "../User/User";

@Entity("PrivateMessage")
class PrivateMessage extends CommonMessage {

    @Column()
    chatId: number;

    @ManyToOne(type => Chat, chat => chat.privateMessages)
    chat: Chat;
    
    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.privateMessages)
    user: User;

};

export default PrivateMessage