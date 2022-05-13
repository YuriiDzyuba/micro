import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { AppStateInterface } from "../../../shared/types/appState.interface";
import { ValidationErrorsInterface } from "../../../shared/types/validationErrors.interface";
import { LoginRequestInterface } from "../../types/loginRequest.interface";
import { loginAction } from "../../store/login.actions";

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  bacEndErrors$: Observable<ValidationErrorsInterface>

  constructor (
    private fb: FormBuilder,
    private store: Store<AppStateInterface | null>,
    ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.bacEndErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    console.log('initializeForm')
    this.form  = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    const request: LoginRequestInterface = this.form.value
    this.store.dispatch(loginAction({ request }))
  }
}
