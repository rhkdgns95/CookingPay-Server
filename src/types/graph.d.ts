export const typeDefs = ["type Chat {\n  id: Int!\n  users: [User]!\n  privateMessages: [PrivateMessage]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype PrivateMessage {\n  id: Int!\n  text: String!\n  chatId: Int\n  chat: Chat!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Donation {\n  id: Int!\n  amount: String!\n  imp_uid: String!\n  contributorId: Int\n  contributor: User!\n  postId: Int\n  post: Post\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreatePostResponse {\n  ok: Boolean!\n  error: String\n  postId: Int\n}\n\ntype Mutation {\n  CreatePost(title: String!, description: String!, photoUrls: [String]): CreatePostResponse!\n  SendPublicMessage(text: String!): SendPublicMessageResponse!\n  EmailSignUp(name: String!, email: String!, password: String!, photo: String): EmailSignUpResponse!\n  UpdateMyProfile(name: String, password: String, photo: String): UpdateMyProfileResponse!\n}\n\ntype GetAllPostResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype Query {\n  GetAllPost: GetAllPostResponse!\n  GetPublicMessage: GetPublicMessageResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  FindEmail(name: String!): FindEmailResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetUserList: GetUserListResponse!\n}\n\ntype Post {\n  id: Int!\n  title: String!\n  description: String!\n  photoUrls: [PostImage]\n  donations: [Donation]\n  writerId: Int\n  writer: User!\n  getAmounts: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype PostImage {\n  id: Int!\n  url: String!\n  postId: Int\n  post: Post!\n}\n\ntype GetPublicMessageResponse {\n  ok: Boolean!\n  error: String\n  publicMessages: [PublicMessage]\n}\n\ntype SendPublicMessageResponse {\n  ok: Boolean!\n  error: String\n  messageId: Int\n}\n\ntype PublicMessage {\n  id: Int!\n  text: String!\n  writerId: Int\n  writer: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Subscription {\n  SubscriptionPublicMessage: PublicMessage\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FindEmailResponse {\n  ok: Boolean!\n  error: String\n  email: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserListResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype User {\n  id: Int!\n  name: String!\n  posts: [Post]\n  email: String!\n  password: String!\n  photo: String\n  publicId: String\n  donations: [Donation]\n  publicMessages: [PublicMessage]\n  privateMessages: [PrivateMessage]\n  chats: [Chat]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetAllPost: GetAllPostResponse;
  GetPublicMessage: GetPublicMessageResponse;
  EmailSignIn: EmailSignInResponse;
  FindEmail: FindEmailResponse;
  GetMyProfile: GetMyProfileResponse;
  GetUserList: GetUserListResponse;
}

export interface EmailSignInQueryArgs {
  email: string;
  password: string;
}

export interface FindEmailQueryArgs {
  name: string;
}

export interface GetAllPostResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
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

export interface User {
  id: number;
  name: string;
  posts: Array<Post> | null;
  email: string;
  password: string;
  photo: string | null;
  publicId: string | null;
  donations: Array<Donation> | null;
  publicMessages: Array<PublicMessage> | null;
  privateMessages: Array<PrivateMessage> | null;
  chats: Array<Chat> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface PublicMessage {
  id: number;
  text: string;
  writerId: number | null;
  writer: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface PrivateMessage {
  id: number;
  text: string;
  chatId: number | null;
  chat: Chat;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  users: Array<User>;
  privateMessages: Array<PrivateMessage> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetPublicMessageResponse {
  ok: boolean;
  error: string | null;
  publicMessages: Array<PublicMessage> | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FindEmailResponse {
  ok: boolean;
  error: string | null;
  email: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetUserListResponse {
  ok: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface Mutation {
  CreatePost: CreatePostResponse;
  SendPublicMessage: SendPublicMessageResponse;
  EmailSignUp: EmailSignUpResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface CreatePostMutationArgs {
  title: string;
  description: string;
  photoUrls: Array<string> | null;
}

export interface SendPublicMessageMutationArgs {
  text: string;
}

export interface EmailSignUpMutationArgs {
  name: string;
  email: string;
  password: string;
  photo: string | null;
}

export interface UpdateMyProfileMutationArgs {
  name: string | null;
  password: string | null;
  photo: string | null;
}

export interface CreatePostResponse {
  ok: boolean;
  error: string | null;
  postId: number | null;
}

export interface SendPublicMessageResponse {
  ok: boolean;
  error: string | null;
  messageId: number | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  SubscriptionPublicMessage: PublicMessage | null;
}
