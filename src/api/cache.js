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

export const isLoggedIn = makeVar(!!sessionStorage.getItem("token"))

export const user = makeVar({
  username: sessionStorage.getItem("username"),
  photoURL: sessionStorage.getItem("photoURL"),
})