import { AuthStateInterface } from "../types/authState.interface";
import { createReducer, on } from "@ngrx/store";
import {registerAction, registerSuccessAction, registerFailureAction} from "./register.actions";

const initialState : AuthStateInterface = {
  isSubmitting: false,
  currentUser:  null,
  isLoggedIn:  null,
  validationErrors:  null,
}

export const authReducer = createReducer(
  initialState,
  on(registerAction, (state):AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),
  on(registerSuccessAction, (state, action):AuthStateInterface => ({
    ...state,
    currentUser: action.currentUser,
    isSubmitting: false,
    isLoggedIn: true
  })),
  on(registerFailureAction, (state, action):AuthStateInterface => ({
    ...state,
    ...initialState,
    validationErrors : action.error,
  }))
)
