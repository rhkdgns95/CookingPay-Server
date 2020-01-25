import { Entity, ManyToOne, Column } from "typeorm";
import CommonMessage from "./CommonMessage";
import User from "../User/User";

@Entity("PublicMessage")
class PublicMessage extends CommonMessage {

    @Column()
    writerId: number;

    @ManyToOne(type => User, user => user.publicMessages)
    writer: User;
};

export default PublicMessage