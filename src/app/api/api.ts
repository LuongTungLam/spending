import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store";
import { logout } from "../store/actions/login-actions";
import { options } from "preact";

export interface External {
    provider?: string,
    token?: string
}

export interface Expense {
    Status?: string,
    PageSize?: string,
    PageNumber?: string,
    from?: string,
    to?: string,
    q?: string
}

@Injectable({
    providedIn: 'root'
})
export class SpendingApi {
    apiUrl = 'https://covid19checking.com/api/';
    external!: External;

    constructor(private http: HttpClient, private store: Store<AppState>) { }
    httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('socicalUser')!).token}`)
    };

    //DebtCharge

    getAllDebtCharges(): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'DebtCharge');
    }

    getDebtCharge(id: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'DebtCharge/detail/' + id);
    }

    //login

    externalLogin(provider: string, token: string): Observable<any> {
        this.external = { provider: provider, token: token };
        return this.http.post(this.apiUrl + 'Account/ExternalLogin', this.external).pipe(
            switchMap((users: any) => {
                let user = users.items;
                if (user != null) {
                    return of(user);
                } else {
                    return throwError(() => new Error('Unable to Login'));
                }
            })
        );
    }

    //Expense
    getAllExpense(expense: any): Observable<any> {
        let param = new HttpParams();
        if (expense) {
            Object.keys(expense).forEach((key) => {
                param = param.append(key, expense[key])
            })
        }
        return this.http.get<any>(this.apiUrl + 'Expense', { params: param, headers: this.httpOptions.headers });
    }


}
