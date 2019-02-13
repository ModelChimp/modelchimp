/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const LOGIN = 'boilerplate/App/LOGIN_REPOS';
export const LOGIN_SUCCESS = 'boilerplate/App/LOGIN_REPOS_SUCCESS';
export const LOGIN_ERROR = 'boilerplate/App/LOGIN_REPOS_ERROR';

export const LOGOUT = 'boilerplate/App/LOGOUT';
export const LOGOUT_SUCCESS = 'boilerplate/App/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'boilerplate/App/LOGOUT_ERROR';
