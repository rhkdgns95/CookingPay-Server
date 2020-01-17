import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Post from "./Post";

@Entity()
class PostImage extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    url: string;

    @Column()
    postId: number;

    @ManyToOne(type => Post, post => post.photoUrls)
    post: Post;

};

export default PostImage;