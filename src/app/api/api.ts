import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store";
import { Expense } from "../entities/expense";

export interface External {
    provider?: string,
    token?: string
}

export interface Params {
    Status?: string,
    PageSize?: number,
    PageNumber?: number,
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
    getAllExpense(params: any): Observable<any> {
        let param = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                param = param.append(key, params[key])
            })
        }
        return this.http.get<any>(this.apiUrl + 'Expense', { params: param, headers: this.httpOptions.headers });
    }

    createExpense(data: Expense): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'Expense/create', data, { headers: this.httpOptions.headers });
    }

    detailExpense(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'Expense/detail/' + id, { headers: this.httpOptions.headers });
    }

    updateExpense(data: Expense): Observable<any> {
        return this.http.put<any>(this.apiUrl + 'Expense/update/' + data.id, data, { headers: this.httpOptions.headers });
    }

    deleteExpense(id: any): Observable<any> {
        return this.http.delete<any>(this.apiUrl + 'Expense/delete/' + id, { headers: this.httpOptions.headers });
    }

    sumExpense(isSpecific: boolean): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'Expense/sum?isSpecific=' + isSpecific, { headers: this.httpOptions.headers });

    }
}
