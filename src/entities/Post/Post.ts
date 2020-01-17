import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, ManyToOne } from "typeorm";
import User from "../User/User";
import Donation from "../Donation/Donation";
import PostImage from "./PostImage";

/**
 *  수정예정사항 
 *  [1] BeforeUpdate amount를 @BeforeUpdate로 대체 가능함.
 */

@Entity()
class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @OneToMany(type => PostImage, postImage => postImage.post, { nullable: true })
    photoUrls?: PostImage[];

    @OneToMany(type => Donation, donations => donations.post)
    donations: Donation[];
    
    @Column()
    writerId: number;

    @ManyToOne(type => User, user => user.posts)
    writer: User;
    
    /** [1] */
    get getAmounts(): number {
        let amount = 0;
        const tmpAmount: Array<number> = this.donations.map(item => parseInt(item.amount))
        if(tmpAmount.length > 0 ) {
            amount = tmpAmount.reduce((prev, current) => prev + current);
        }
        // const amount = this.donations.map(item => item.amount)
        return amount;
    }

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
};

export default Post;