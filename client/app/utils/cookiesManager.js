import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CookiesManager = {
  getAuthToken(tokenName) {
    return cookies.get(tokenName);
  },

  setAuthToken(tokenName, token) {
    cookies.set(tokenName, token, { path: '/' });
  },

  removeAuthToken(tokenName) {
    cookies.remove(tokenName, { path: '/' });
  },

  getCookie(cookieName) {
    return cookies.get(cookieName);
  },

  setCookie(cookieName, cookie, options = {}) {
    cookies.set(cookieName, cookie, options);
  },
};

export default CookiesManager;
