import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {ValidationErrorsInterface} from "../../shared/types/validationErrors.interface";

export interface AuthStateInterface {
  isSubmitting: boolean
  isLoading: boolean
  currentUser: CurrentUserInterface | null
  isLoggedIn: boolean | null
  validationErrors: ValidationErrorsInterface | null
}
