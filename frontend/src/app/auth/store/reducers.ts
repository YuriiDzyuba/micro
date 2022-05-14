import { AuthStateInterface } from "../types/authState.interface";
import { createReducer, on } from "@ngrx/store";
import { registerAction, registerSuccessAction, registerFailureAction } from "./register.actions";
import { loginAction, loginFailureAction, loginSuccessAction } from "./login.actions";
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from "./getCurrentUser.actions";

const initialState : AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
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
  })),
  on(loginAction, (state):AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),
  on(loginSuccessAction, (state, action):AuthStateInterface => ({
    ...state,
    currentUser: action.currentUser,
    isSubmitting: false,
    isLoggedIn: true
  })),
  on(loginFailureAction, (state, action):AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors : action.error,
  })),
  on(getCurrentUserAction, (state ):AuthStateInterface => ({
    ...state,
   isLoading: true
  })),
  on(getCurrentUserSuccessAction, (state, action):AuthStateInterface => ({
    ...state,
    currentUser: action.currentUser,
    isLoggedIn: true,
    isLoading: false
  })),
  on(getCurrentUserFailureAction, (state):AuthStateInterface => ({
  ...state,
    isLoading: false,
    isLoggedIn: false,
    currentUser: null
  })),
)
