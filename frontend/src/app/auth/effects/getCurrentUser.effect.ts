import { Injectable } from "@angular/core";
import { Actions , createEffect, ofType} from "@ngrx/effects";
import { catchError , map, of, switchMap, tap} from "rxjs";
import { AuthService } from "../services/auth.service";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { PersistenceService } from "../../shared/services/persistenceService";
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from "../store/getCurrentUser.actions";

@Injectable()
export class GetCurrentUserEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
  ) {}

  getCurrentUser$ = createEffect(()=> this.actions$.pipe(
    ofType(getCurrentUserAction),
    switchMap(() => {
      const accessToken = this.persistenceService.get('accessToken')

      if (!accessToken) return of(getCurrentUserFailureAction())

      return this.authService.getCurrentUser().pipe(
        map((currentUser: CurrentUserInterface) => {
          return getCurrentUserSuccessAction({currentUser})
        }),
        catchError(()=>{
          return of(getCurrentUserFailureAction())
        })
      )
    })
  ))
}
