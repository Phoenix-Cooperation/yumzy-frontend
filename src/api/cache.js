import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedIn();
          }
        },
        user: {
          read() {
            return user();
          }
        }
      }
    }
  }
});

export const isLoggedIn = makeVar(!!localStorage.getItem("token"))

export const user = makeVar({
  username: localStorage.getItem("username"),
  photoURL: localStorage.getItem("photoURL"),
})