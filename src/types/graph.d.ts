export const typeDefs = ["type GetUsersResponse {\n  ok: Boolean!\n  error: String!\n}\n\ntype Query {\n  GetUsers: GetUsersResponse!\n}\n\ntype User {\n  id: Int!\n  name: String!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetUsers: GetUsersResponse;
}

export interface GetUsersResponse {
  ok: boolean;
  error: string;
}

export interface User {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}
