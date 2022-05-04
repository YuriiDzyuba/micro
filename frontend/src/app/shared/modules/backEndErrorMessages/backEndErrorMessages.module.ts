import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackEndErrorMessagesComponent} from "./components/backEndErrorMessages.component";

@NgModule({
  declarations: [BackEndErrorMessagesComponent],
  exports: [BackEndErrorMessagesComponent],
  imports: [
    CommonModule
  ]
})
export class BackEndErrorMessagesModule {}
