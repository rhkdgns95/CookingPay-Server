export const typeDefs = ["type Donation {\n  id: Int!\n  amount: String!\n  imp_uid: String!\n  contributorId: Int\n  contributor: User!\n  postId: Int\n  post: Post\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreatePostResponse {\n  ok: Boolean!\n  error: String\n  postId: Int\n}\n\ntype Mutation {\n  CreatePost(title: String!, description: String!, photoUrls: [String]): CreatePostResponse!\n  EmailSignUp(name: String!, email: String!, password: String!): EmailSignUpResponse!\n}\n\ntype Post {\n  id: Int!\n  title: String!\n  description: String!\n  photoUrls: [PostImage]\n  donations: [Donation]\n  writerId: Int\n  writer: User!\n  getAmounts: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype PostImage {\n  id: Int!\n  url: String!\n  postId: Int\n  post: Post!\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Query {\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  name: String!\n  posts: [Post]\n  email: String!\n  password: String!\n  donations: [Donation]\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  EmailSignIn: EmailSignInResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface EmailSignInQueryArgs {
  email: string;
  password: string;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  posts: Array<Post> | null;
  email: string;
  password: string;
  donations: Array<Donation> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  photoUrls: Array<PostImage> | null;
  donations: Array<Donation> | null;
  writerId: number | null;
  writer: User;
  getAmounts: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface PostImage {
  id: number;
  url: string;
  postId: number | null;
  post: Post;
}

export interface Donation {
  id: number;
  amount: string;
  imp_uid: string;
  contributorId: number | null;
  contributor: User;
  postId: number | null;
  post: Post | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CreatePost: CreatePostResponse;
  EmailSignUp: EmailSignUpResponse;
}

export interface CreatePostMutationArgs {
  title: string;
  description: string;
  photoUrls: Array<string> | null;
}

export interface EmailSignUpMutationArgs {
  name: string;
  email: string;
  password: string;
}

export interface CreatePostResponse {
  ok: boolean;
  error: string | null;
  postId: number | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
