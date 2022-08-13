import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient(process.env.REACT_APP_API!);

export default graphQLClient;
