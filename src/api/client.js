import {ApolloClient, HttpLink, split} from "@apollo/client"
import {WebSocketLink} from "@apollo/client/link/ws";
import {SubscriptionClient} from "subscriptions-transport-ws"
import {cache} from "./cache";
import {getMainDefinition} from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:5000/graphql", {
    connectionParams: {
      authToken: localStorage.getItem("token")
    }
  })
);
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);


const createClient = () => {
  console.log("apollo client created")
  return new ApolloClient({
    // eslint-disable-next-line no-undef
    link: splitLink,
    cache: cache,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    }
  })
}

let client = createClient();
window.addEventListener("storage", () => {
  client = createClient()
});

export default client;