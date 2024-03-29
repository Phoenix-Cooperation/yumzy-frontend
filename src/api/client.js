import { ApolloClient } from "@apollo/client"
import { cache } from "./cache";

const createClient = () => {
  console.log("apollo client created")
  return new ApolloClient({
    // eslint-disable-next-line no-undef
    uri: process.env.REACT_APP_BACKEND_API,
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