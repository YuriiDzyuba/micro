import { createAction, props } from '@ngrx/store';

import { ActionTypes } from "./actionTypes";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { ValidationErrorsInterface } from "../../shared/types/validationErrors.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";

export const loginAction = createAction(
  ActionTypes.AUTH,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.AUTH_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const loginFailureAction = createAction(
  ActionTypes.AUTH_FAILURE,
  props<{ error : ValidationErrorsInterface }>()
);
