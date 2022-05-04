import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "../store/register.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthService} from "../services/auth.service";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(()=> this.actions$.pipe(
    ofType(registerAction),
    switchMap(({ request }) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          return registerSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse)=>{
          return of(registerFailureAction({error: errorResponse.error}))
        })
      )
    })
  ))

  constructor(
    private actions$: Actions,
    private authService: AuthService
    ) {
  }
}
