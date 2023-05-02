import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UserSignup} from "../model/user-signup";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  signup(userSignup: UserSignup) {
    return this.httpClient.post<any>(`${this.host}/auth/register`, userSignup);
  }
}
