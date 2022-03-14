import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventService } from 'src/app/services/event-service';
import { Params } from '../api/api';
import { Expense } from '../entities/expense';
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

export interface Type {
  name: string,
  value: number,
}

export class Paginator {
  currentPage!: number;
  totalPages!: number;
  pageSize!: number;
  totalCount!: number;
  hasPrevious!: boolean;
  hasNext!: boolean;
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
  params!: Params;
  expense: Expense = new Expense();
  lstType: Type[] = [];
  total = 0;
  isAdd = false;
  submitted = false;
  paginator: Paginator = new Paginator();
  lstSpecific: any[] = [];
  isSpecific = false;

  constructor(private confirmationService: ConfirmationService, private eventService: EventService, private messageService: MessageService, private store: Store<AppState>, private homeService: HomeService) { }

  ngOnInit(): void {

    this.lstType = [
      { name: 'Assgin', value: 1 },
      { name: 'None', value: 0 }
    ]

    this.lstSpecific = [
      { name: 'Toàn bộ', value: true },
      { name: 'Cá nhân', value: false }
    ]

    this.store.select((state) => state.login.user).subscribe(rs => {
      this.user = rs
    })

    // this.expense = { Status: 'Active' }
    this.params = { PageNumber: 1, PageSize: 5 }

    this.onGetExpense(this.params);
    this.onChangeTotal();
    if (this.user) {
      // setTimeout(() => {
      //   this.store.dispatch(autoLogout({ user: this.user }));
      // }, 5000)
    }

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

  onGetExpense(params: Params) {
    this.homeService.getAllExpenses(params).subscribe(rs => {
      this.spendings = rs.items.items;
      this.paginator = {
        currentPage: rs.items.currentPage,
        totalPages: rs.items.totalPages,
        pageSize: rs.items.pageSize,
        totalCount: rs.items.totalCount,
        hasPrevious: rs.items.hasPrevious,
        hasNext: rs.items.hasNext,
      };
    })
  }

  onLogout() {
    this.store.dispatch(logout())
  }

  onAddExpense() {
    this.expense = {};
    this.isAdd = true;
    this.submitted = false;
    this.showDialogSpending = true;
  }

  convertShowType(type: any): string {
    if (type === 'Assign') {
      return 'Riêng'
    } else {
      return 'Chung'
    }
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

  ondetailExpense(id: any) {
    this.isAdd = false;
    this.homeService.detailExpense(id).subscribe(rs => {
      if (rs.succeeded) {
        this.expense = rs.items;
        this.showDialogSpending = true;
      }
    });
  }

  onSaveSpending() {
    this.submitted = true;
    if (this.validateExpense(this.expense)) {
      if (this.isAdd) {
        this.homeService.createExpense(this.expense).subscribe(rs => {
          if (rs.succeeded) {
            this.expense = {};
            this.showDialogSpending = false;
            this.onGetExpense(this.params);
            this.messageService.add({ severity: "success", summary: "Mất tiền rồi", detail: "Đéo biết bao giờ mới kiếm được lại" });
          } else {
            this.messageService.add({ severity: "error", summary: "Sai rồi", detail: "Tạo lại đê" });
          }
        })
      } else {
        this.homeService.updateExpense(this.expense).subscribe(rs => {
          if (rs.succeeded) {
            this.expense = {};
            this.showDialogSpending = false;
            this.onGetExpense(this.params);
            this.messageService.add({ severity: "success", summary: "Mất tiền rồi", detail: "Đéo biết bao giờ mới kiếm được lại" });
          } else {
            this.messageService.add({ severity: "error", summary: "Sai rồi", detail: "Tạo lại đê" });
          }
        })

      }
    }
  }

  validateExpense(expense: Expense): boolean {
    if (expense.name && expense.amount && expense.description && expense.type) {
      return true;
    }
    return false;
  }

  paginate(event: any) {
    this.params = { PageNumber: event.page + 1, PageSize: event.rows };
    this.onGetExpense(this.params);
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Có chắc chắn muốn xóa không?',
      icon: 'pi pi-trash',
      accept: () => {
        this.homeService.deleteExpense(id).subscribe(rs => {
          if (rs.succeeded) {
            this.messageService.add({ severity: "success", summary: "Xoá thành công", detail: "Tính sai là tại mày đấy " + this.user.fullName + " à" });
            this.onGetExpense(this.params);
          } else {
            this.messageService.add({ severity: "error", summary: "Sai rồi", detail: "Xem lại đê" });
          }
        })
      },
      reject: () => {
        //reject action
      }
    });
  }

  onChangeTotal() {
    this.homeService.sumExpense(this.isSpecific).subscribe(rs => {
      this.total = rs.items.specific[0].total
    })
  }
}
