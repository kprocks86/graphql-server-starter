import {
  gql,
} from 'apollo-server-express';

export default gql`
  type Message {
      id: Int!
      text: String!
      user: User!
      channel: Channel!
}`;
