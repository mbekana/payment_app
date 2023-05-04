import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  paymentDetails: Payment[] = [];

  displayedColumns: string[] = [
    'id',
    'sender',
    'receiver',
    'paidAmount',
    'totalAmount',
  ];

  selectedTransactionId?: number;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.selectedTransactionId = Number(
      this.activatedRoute.snapshot.params['id']
    );
    console.log('Parent ID: ', this.selectedTransactionId);
    this.onLoadPyamentDetails(this.selectedTransactionId);
  }

  ngOnInit(): void {}

  onLoadPyamentDetails = (parentId: number) => {
    this.paymentService.loadPaymentDetails(parentId).subscribe(
      (res: any) => {
        this.paymentDetails = res;
        console.log(this.paymentDetails);
      },
      (error: any) => {
        if (error.status !== 0) {
          this._snackBar.open(error.error.message, 'Error');
        }
      }
    );
  };

  goBack = () => {
    this.router.navigate(['/transactions']);
  };
}
