import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedIn();
          }
        }
      }
    }
  }
});

export const isLoggedIn = makeVar(!!localStorage.getItem("token"))