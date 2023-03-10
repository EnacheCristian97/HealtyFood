import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    displayName: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpTimer:any;

    constructor(private http: HttpClient, private router: Router){}

    signup(email:string, password: string, displayName: string) {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkMQN69sF5bd4JUOj3BhCkGo04M3aMl70',
        {
            email: email,
            password: password,
            displayName: displayName,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData => {
           this.handleAuth(
            resData.email,
            resData.localId,
            resData.displayName,
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
             resData.displayName,
             resData.idToken,
             +resData.expiresIn
             )
         }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if(this.tokenExpTimer) {
            clearTimeout(this.tokenExpTimer);
        }
        this.tokenExpTimer = null;
    }

    autoLogin() {
       const userData : {
        email: string;
        id:string;
        displayName:string;
        _token: string;
        _tokenExpirationDate: string;
       } = JSON.parse(localStorage.getItem('userData'));
       if(!userData) {
        return;
       }

       const loadedUser = new User
       (
        userData.email,
        userData.id,
        userData.displayName,
        userData._token,
        new Date(userData._tokenExpirationDate));

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expDuration);
        }

    }

    autoLogout(expirationDuration: number) {
       this.tokenExpTimer = setTimeout(() => {
            this.logout();
        },expirationDuration);
    }

    private handleAuth(email:string, userId: string, displayName:string, token:string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userId, 
            displayName,
            token, 
            expirationDate 
            );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
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