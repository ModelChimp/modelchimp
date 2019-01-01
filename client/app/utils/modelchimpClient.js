import CookiesManager from 'utils/cookiesManager';
import request from 'utils/request';
import { call } from 'redux-saga/effects';

/**
* ModelchimpClient - Wrapper for HTTP client
*/
class ModelchimpClient {
    constructor(baseURL = '/') {
        this.tokenName = 'token';
        this.apiURL = '/api/'

        if (!ModelchimpClient.instance) {
            this.defaultOptions = {
                headers: {
                    Authorization: '',
                    'Content-Type': 'application/json',
                },
            };
            this.baseURL = baseURL;
            ModelchimpClient.instance = this;
        }

        return ModelchimpClient.instance;
    }

    setDefaultOptions(baseURL = '/') {
        this.baseURL = baseURL;

        if (this.isAuthenticated()) {
            const authToken = CookiesManager.getAuthToken(this.tokenName);
        }

        this.updateAuthToken();
    }

    isAuthenticated() {
        const authToken = CookiesManager.getAuthToken(this.tokenName);
        if (authToken) {
          return true;
        }
        return false;
    }

    login(token) {
      CookiesManager.setAuthToken('token', token)
      this.updateAuthToken();
    }

    logout() {
      CookiesManager.removeAuthToken('token');
      this.updateAuthToken();
    }

    updateAuthToken() {
        const authToken = CookiesManager.getAuthToken(this.tokenName);

        if (authToken) {
           this.defaultOptions.headers.Authorization = `Token ${authToken}`;
        } else {
            CookiesManager.removeAuthToken(this.tokenName);
        }
      }

    get(url) {
        let targetURL = this.baseURL + this.apiURL + url;
        return call(request, targetURL, { ...this.defaultOptions, method: 'GET',});
    }

    post(url, params = {}) {
        let targetURL = this.baseURL + this.apiURL + url;
        return call(request, targetURL, { ...this.defaultOptions, method: 'POST', ...params});
    }

    patch(url, params = {}) {
        // return axios.patch(url, params, { ...this.defaultOptions });
    }

    put(url, params = {}) {
        // return axios.put(url, params, { ...this.defaultOptions });
    }

    delete(url) {
        // return axios.delete(url, { ...this.defaultOptions });
    }

    getImageUrl(url) {
      let targetURL = this.baseURL + url;
      return targetURL;
    }
}

const instance = new ModelchimpClient();
export default instance;
