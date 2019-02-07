import auth from 'auth/auth';

class Api {
  constructor() {
    this.prefix = '/api/';
  }

  async fetchJSON(url, options) {
    let data = {};

    const response = await fetch(url, options);
    const text = await response.text();
    if (text) {
      data = JSON.parse(text);
    }

    return {
      status: response.status,
      headers: response.headers,
      json: data
    };
  }

  async api(method, body, withToken = true) {
    console.log('API Method:' + method);
    body = body ? body : {};
    if (withToken) {
      body = Object.assign(body, {
        token: auth.getToken(),
        email: auth.getEmail()
      });
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const response = await this.fetchJSON(this.prefix + method, options);
    return response;
  }

  async signup(email, pw) {
    return await this.api(`tokenfree/signup`, { email, pw }, false);
  }

  async signin(email, pw) {
    const response = await this.api(`tokenfree/signin`, { email, pw }, false);
    return response.json;
  }

  async fetchMyContact() {
    const response = await this.api(`fetchMyContact`);
    return response.json;
  }

  async fetchAllContact() {
    const response = await this.api('fetchAllContact');
    return response.json;
  }

  async fetchContactsWithKeywords(keyword) {
    const response = await this.api('fetchContactsWithKeywords', { keyword });
    return response.json;
  }

  async fetchNotifications() {
    const response = await this.api('fetchNotifications');
    return response.json;
  }

  async sendFriendRequest(email) {
    await this.api('sendFriendRequest', { contact: email });
  }

  async fetchRecentChatContact() {
    const response = await this.api('fetchRecentChatContact');
    return response.json;
  }

  async createNewUser(user) {
    const response = await this.api('createNewUser', user);
    return response.json;
  }

  async createUserWithFbToken(token) {
    const response = await this.api('tokenfree/fbCreateUser', token, false);
    return response.json;
  }

  async createUserWithGoogleToken(token) {
    const response = await this.api('tokenfree/googleCreateUser', token, false);
    return response.json;
  }
}

export default new Api();
