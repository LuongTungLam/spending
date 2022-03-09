import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/services/event-service';
import { Expense } from '../api/api';
import { HomeService } from '../services/home-service';
import { AppState } from '../store';
import { autoLogout, logout } from '../store/actions/login-actions';
import { User } from '../store/reducers/user';

export interface owe {
  id?: number,
  condition?: string,
  money?: number,
  createdDate?: string,
  debtor?: number,
  createdBy?: string,
  status?: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: any[] = [];
  optionsCalendar: any;
  header: any;
  data: any;
  options: any;
  spendings: any[] = [];
  owes: any[] = [];
  showDialogSpending = false;
  showDialogOwe = false;
  lstOc: any[] = [];
  owe: owe = {};
  user!: User;
  expense!: Expense;

  constructor(private router: Router, private eventService: EventService, private messageService: MessageService, private store: Store<AppState>, private homeService: HomeService) { }

  ngOnInit(): void {

    this.store.select((state) => state.login.user).subscribe(rs => {
      this.user = rs
    })

    this.expense = { Status: 'Active' }


    this.onGetExpense(this.expense);

    if (this.user) {
      // setTimeout(() => {
      //   this.store.dispatch(autoLogout({ user: this.user }));
      // }, 5000)
    }

    // this.spendings = [
    //   { id: 1, condition: 'Mua gạo', money: 250000, createdDate: '17-02-2022', createdBy: 'LamLT', status: 0 }
    // ]
    this.owes = [
      { id: 1, condition: 'Mua gạo', money: 250000, createdDate: '17-02-2022', debtor: 'Oc Kai', createdBy: 'LamLT', status: 0 }
    ]
    this.lstOc = [
      { id: 1, name: 'Oc Kai' },
      { id: 2, name: 'Oc Trường' },
    ]

    this.data = {
      labels: ['Óc kai', 'Tao', 'Óc Trường'],
      datasets: [
        {
          data: [3000000, 500000, 1000000],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    };

    this.options = {
      plugins: {
        title: {
          display: true,
          text: 'TỔNG CHI TIÊU',
        },
        legend: {
          position: 'bottom'
        },
      },
    };

    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.optionsCalendar = { ...this.optionsCalendar, ...{ events: events.data } };
    });

    this.optionsCalendar = {
      initialDate: '2022-02-17',
      headerToolbar: {
        left: 'prev,next today',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
        position: 'left'
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
    };
  }

  onGetExpense(_expense: Expense) {
    this.homeService.getAllExpenses(_expense).subscribe(rs => {
      this.spendings = rs.items.items;
    })
  }

  onLogout() {
    this.store.dispatch(logout())
  }

  onShowDialogSpending() {
    this.showDialogSpending = true;
  }

  onShowDialogOwe() {
    this.showDialogOwe = true;
  }

  onSaveOwe() {
    this.showDialogOwe = false;
    this.owes.push(this.owe)
    this.owe = {};
    this.messageService.add({ severity: "success", summary: "Đã ghi nợ", detail: "Đéo biết bao giờ mới trả" });
  }

  onSaveSpending() {
    this.showDialogSpending = false;
    this.messageService.add({ severity: "success", summary: "Mất tiền rồi", detail: "Đéo biết bao giờ mới kiếm được lại" });
  }
}
