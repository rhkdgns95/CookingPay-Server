export const typeDefs = ["type Donation {\n  id: Int!\n  amount: String!\n  imp_uid: String!\n  contributorId: Int\n  contributor: User!\n  postId: Int\n  post: Post\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Post {\n  id: Int!\n  text: String!\n  donations: [Donation]\n  writerId: Int\n  writer: User!\n  getAmounts: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  EmailSignUp(name: String!, email: String!, password: String!): EmailSignUpResponse!\n}\n\ntype GetUsersResponse {\n  ok: Boolean!\n  error: String!\n}\n\ntype Query {\n  GetUsers: GetUsersResponse!\n}\n\ntype User {\n  id: Int!\n  name: String!\n  posts: [Post]\n  email: String!\n  password: String!\n  donations: [Donation]\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetUsers: GetUsersResponse;
}

export interface GetUsersResponse {
  ok: boolean;
  error: string;
}

export interface Mutation {
  EmailSignUp: EmailSignUpResponse;
}

export interface EmailSignUpMutationArgs {
  name: string;
  email: string;
  password: string;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
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
  donations: Array<Donation> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Post {
  id: number;
  text: string;
  donations: Array<Donation> | null;
  writerId: number | null;
  writer: User;
  getAmounts: number | null;
  createdAt: string;
  updatedAt: string | null;
}
