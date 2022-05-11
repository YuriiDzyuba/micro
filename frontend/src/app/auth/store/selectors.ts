import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../shared/types/appState.interface";
import { AuthStateInterface } from "../types/authState.interface";
import { ValidationErrorsInterface } from "../../shared/types/validationErrors.interface";

export const authFeatureSelector = (state: AppStateInterface):AuthStateInterface => state.auth

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface): boolean => authState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface): ValidationErrorsInterface => authState.validationErrors
)
