import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "../store/register.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {AuthService} from "../services/auth.service";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistenceService} from "../../shared/services/persistenceService";
import {Router} from "@angular/router";

@Injectable()
export class RegisterEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  register$ = createEffect(()=> this.actions$.pipe(
    ofType(registerAction),
    switchMap(({ request }) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistenceService.set('accessToken', currentUser.accessToken)
          this.persistenceService.set('refreshToken', currentUser.refreshToken)
          return registerSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse)=>{
          return of(registerFailureAction({error: errorResponse.error}))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )


}
