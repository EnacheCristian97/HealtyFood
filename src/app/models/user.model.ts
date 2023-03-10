export class User {
   public email:string;
   public id: string;
   public displayName: string;
   private _token: string;
   private _tokenExpirationDate: Date;

    constructor(email:string, id: string,displayName:string, _token:string, _tokenExpirationDate:Date) {
        this.email = email;
        this.id = id;
        this.displayName = displayName;
        this._token = _token;
        this._tokenExpirationDate = _tokenExpirationDate;  
    }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}