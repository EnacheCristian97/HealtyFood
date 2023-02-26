import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "../models/user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient){}

    signup(email:string, password: string) {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkMQN69sF5bd4JUOj3BhCkGo04M3aMl70',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData => {
           this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
            )
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkMQN69sF5bd4JUOj3BhCkGo04M3aMl70',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap(resData => {
            this.handleAuth(
             resData.email,
             resData.localId,
             resData.idToken,
             +resData.expiresIn
             )
         }));
    }

    private handleAuth(email:string, userId: string ,token:string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate 
            );
        this.user.next(user);
        }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists!';
              break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The email or password are incorrect!'
              break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The email or password are incorrect!'
              break;
          }
          return throwError(errorMessage);
    }
}