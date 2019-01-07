import {
  LOAD_MENU_PARAMETER,
  LOAD_MENU_PARAMETER_SUCCESS,
  LOAD_MENU_PARAMETER_ERROR
} from './constants';


export function loadMenuParameterAction(projectId) {
  return {
    type: LOAD_MENU_PARAMETER,
    projectId
  };
}

export function loadMenuParameterSuccessAction(menuParam) {
  return {
    type: LOAD_MENU_PARAMETER_SUCCESS,
    menuParam,
  };
}

export function loadMenuParameterErrorAction(error) {
  return {
    type: LOAD_MENU_PARAMETER_ERROR,
    error,
  };
}
