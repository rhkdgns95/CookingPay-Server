import { BaseEntity, Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import Post from "../Post/Post";
import User from "../User/User";

@Entity()
class Donation extends BaseEntity {
    
    @PrimaryColumn()
    id: number;
    
    @Column('text')
    amount: string; // ''원 단위
    
    @Column('text')
    imp_uid: string; // 아임포트 결제 고유 id
    
    @Column()
    contributorId: number;

    @ManyToOne(type => User, user => user.donations)
    contributor: User;

    @Column()
    postId: number;

    @ManyToOne(type => Post, post => post.donations)
    post: Post;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
};

export default Donation;