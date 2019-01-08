import {
  LOAD_MENU_PARAMETER,
  LOAD_MENU_PARAMETER_SUCCESS,
  LOAD_MENU_PARAMETER_ERROR,
  SET_COLUMN_TARGET_KEY
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

export function setTargetKeysAction(targetKeys) {
  return {
    type: SET_COLUMN_TARGET_KEY,
    targetKeys,
  };
}
