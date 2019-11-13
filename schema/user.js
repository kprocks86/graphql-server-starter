import {
  gql,
} from 'apollo-server-express';

export default gql`
type User {
    id: String!
    name: String!
    email: String!,
}
type RegisterRes {
    ok: Boolean
    user: User
    errors: [Error!]
}

type LoginRes {
  ok: Boolean,
  token: String,
  errors: [Error!]
}
type Query {
  getUsers: [User]!
}
type Mutation {
  register(name: String!, email: String!, password: String!): RegisterRes,
  login(email: String!, password: String!): LoginRes
}
`;
