import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { select, Store } from "@ngrx/store";
import { registerAction } from "../../store/register.actions";
import { Observable } from "rxjs";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";
import { AppStateInterface } from "../../../shared/types/appState.interface";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { ValidationErrorsInterface } from "../../../shared/types/validationErrors.interface";

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = this.form.value
    this.store.dispatch(registerAction({ request }))
  }
}
