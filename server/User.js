class User {
  constructor(uid, access_token, refresh_token) {
    this.uid = uid;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}

module.exports = User;
