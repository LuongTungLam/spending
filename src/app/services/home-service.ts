import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params, SpendingApi } from '../api/api';
import { Expense } from '../entities/expense';


@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private api: SpendingApi) { }

    getAllExpenses(params: Params): Observable<any> {
        return this.api.getAllExpense(params);
    }

    createExpense(data: Expense): Observable<any> {
        return this.api.createExpense(data);
    }


    detailExpense(id: any): Observable<any> {
        return this.api.detailExpense(id);
    }

    updateExpense(data: Expense): Observable<any> {
        return this.api.updateExpense(data);
    }

    deleteExpense(id: any): Observable<any> {
        return this.api.deleteExpense(id);
    }

    sumExpense(isSpecific: boolean): Observable<any> {
        return this.api.sumExpense(isSpecific);
    }

}
