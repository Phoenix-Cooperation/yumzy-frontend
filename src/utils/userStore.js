import { user, isLoggedIn } from "../api/cache";
export default class userStore {

  static storage = localStorage;

  static setUser(username, photoURL) {
    const tempUser = {
      username: undefined,
      photoURL: undefined,
    }

    if (username) {
      this.storage.setItem("username", username);
      tempUser.username = username;
    }
    if (photoURL) {
      this.storage.setItem("photoURL", photoURL);
      tempUser.photoURL = photoURL;
    }

    user(tempUser);

  }

  static setToken(token) {
    this.storage.setItem("token", token);
    window.dispatchEvent(new Event("storage"))
  }

  static getToken() {
    return this.storage.getItem("token")
  }

  static getUserName() {
    return this.storage.getItem("username");
  }

  static getPhotoURL() {
    return this.storage.getItem("photoURL")
  }

  static clearUserStore() {
    this.storage.removeItem("username")
    this.storage.removeItem("token")
    this.storage.removeItem("photoURL")
    this.storage.removeItem("refreshToken")

    window.dispatchEvent(new Event("storage"))
    isLoggedIn(false);
    user({ username: undefined, photoURL: undefined })
  }
}