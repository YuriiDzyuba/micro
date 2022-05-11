import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrorsInterface } from "../../../types/validationErrors.interface";

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backEndErrorMessages.component.html',
  styleUrls: ['./backEndErrorMessages.component.scss']
})
export class BackEndErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: ValidationErrorsInterface

  errorMessages: string[]

  ngOnInit(): void {
    console.log(this.backendErrorsProps,"this.backendErrorsProps")
    this.errorMessages = this.backendErrorsProps.message.map(
      (name: string) => {
        return `${name}`
      }
    )
  }

}
