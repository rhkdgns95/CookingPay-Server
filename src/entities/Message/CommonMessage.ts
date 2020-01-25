import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length } from "class-validator";

class CommonMessage extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    @Length(1, 100, { message: "Please input message length 1 ~ 100" })
    text: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
    
};

export default CommonMessage;