import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Transaction, TransactionResponse } from 'src/app/models/transaction';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'sender',
    'receiver',
    'totalAmount',
    'paidTotalAmount',
  ];
  pageSizeOptions: number[] = [10, 25, 50];
  pageSize: number = 2;
  pageIndex: number = 0;
  totalItems: number = 0;
  length?: number;
  pageEvent?: PageEvent;

  transactions: Transaction[] = [];
  paymentDetails: any[] = [];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  loading?: boolean;

  constructor(
    private transactionService: TransactionService,
    private paymentService: PaymentService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onLoadTransactions(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    // Handle page change event
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageEvent = event;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.onLoadTransactions(this.pageIndex, this.pageSize);
  }

  onLoadTransactions = (pageIndex: number, pageSize: number) => {
    this.loading = true;
    this.transactionService.loadTransactions(pageIndex, pageSize).subscribe(
      (response: TransactionResponse) => {
        this.loading = false;
        this.transactions = response.content!;
        this.length = response.totalElements;
      },
      (error: any) => {
        this.loading = false;
        if (error.status !== 0) {
          this._snackBar.open(error.error.message, 'Error');
        }
      }
    );
  };

  onNavigateToPaymentDetails = (id: number) => {
    this.router.navigate(['/transactions', id]);
    console.log(id);
  };
}
