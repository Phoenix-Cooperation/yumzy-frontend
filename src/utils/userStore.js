export default class userStore {

  static storage = localStorage;
  static setUser(username, photoURL = undefined) {
    if (username) {
      this.storage.setItem("username", username);
    }
    if (photoURL) {
      this.storage.setItem("photoURL", photoURL);
    }
  }

  static setToken(token) {
    this.storage.setItem("token", token);
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
  }
}