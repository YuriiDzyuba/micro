import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { map, Observable } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { HttpClient } from "@angular/common/http";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { environment } from "../../../environments/environment";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserFromResponse(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.jwtApiUrl + '/user'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUserFromResponse))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.jwtApiUrl + '/user/login'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUserFromResponse))
  }
}
