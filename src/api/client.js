import { ApolloClient } from "@apollo/client"
import { cache } from "./cache";

const client = new ApolloClient({
  // eslint-disable-next-line no-undef
  uri: process.env.REACT_APP_BACKEND_URL,
  cache: cache
})

export default client;