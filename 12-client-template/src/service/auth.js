import axios from 'axios';
export default class AuthService {
  constructor(baseURL, tokenStorage) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      headers: { 'Cotent-Type': 'application/json' },
    });
    this.tokenStorage = tokenStorage;
  }

  async login(username, password) {
    const response = await this.instance.post('auth/login', {
      username,
      password,
    });

    if (response.status !== 200) {
      throw new Error(response.message);
    }
    this.tokenStorage.saveToken(response.data.token);
    return response.data;
  }

  async me() {
    const token = this.tokenStorage.getToken();

    const response = await this.instance.get('auth/me', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.message);
    }

    return response.data;
  }

  async logout() {
    this.tokenStorage.clearToken();
  }

  async signup(username, password, name, email, url) {
    const response = await this.instance.post('auth/signup', {
      username,
      password,
      name,
      email,
      url,
    });
    this.tokenStorage.saveToken(response.data.token);
    if (response.status !== 201) {
      throw new Error(response.message);
    }

    return response.data;
  }
}
