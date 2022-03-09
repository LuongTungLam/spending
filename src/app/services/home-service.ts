import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense, SpendingApi } from '../api/api';


@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private api: SpendingApi) { }

    getAllExpenses(expense: Expense): Observable<any> {
        return this.api.getAllExpense(expense);

    }

}
