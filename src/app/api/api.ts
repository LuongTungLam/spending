import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

export interface Extrernal {
    provider?: string,
    token?: string
}

@Injectable({
    providedIn: 'root'
})
export class SpendingdApi {
    apiUrl = 'https://covid19checking.com/api/';
    external!: Extrernal;

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    //DebtCharge

    getAllDebtCharges(): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'DebtCharge');
    }

    getDebtCharge(id: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'DebtCharge/detail/' + id);
    }

    externalLogin(provider: string, token: string) {
        this.external = { provider: provider, token: token };
        console.log(this.external);
        
        return this.http.post(this.apiUrl + 'Account/ExternalLogin', this.external);
    }

}