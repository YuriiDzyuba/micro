import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RegisterComponent } from "./components/register/register.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./store/reducers";
import { AuthService } from "./services/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "./effects/register.effect";
import { BackEndErrorMessagesModule } from "../shared/modules/backEndErrorMessages/backEndErrorMessages.module";
import { PersistenceService } from "../shared/services/persistenceService";
import { LoginEffect } from "./effects/login.effect";
import { LoginComponent } from "./components/login/login.component";
import { GetCurrentUserEffect } from "./effects/getCurrentUser.effect";

@NgModule({
  imports:[
    CommonModule,
    BackEndErrorMessagesModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect])
  ],
  declarations:[RegisterComponent, LoginComponent],
  providers:[AuthService, PersistenceService],
})

export class AuthModule {}
