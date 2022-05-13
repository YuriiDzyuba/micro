import { Injectable } from "@angular/core";
import { Actions , createEffect, ofType} from "@ngrx/effects";
import { catchError , map, of, switchMap, tap} from "rxjs";
import { AuthService } from "../services/auth.service";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistenceService } from "../../shared/services/persistenceService";
import { Router } from "@angular/router";
import { loginAction, loginFailureAction, loginSuccessAction } from "../store/login.actions";

@Injectable()
export class LoginEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  login$ = createEffect(()=> this.actions$.pipe(
    ofType(loginAction),
    switchMap(({ request }) => {
      return this.authService.login(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistenceService.set('accessToken', currentUser.accessToken)
          this.persistenceService.set('refreshToken', currentUser.refreshToken)
          return loginSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse)=>{
          return of(loginFailureAction({error: errorResponse.error}))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )
}
