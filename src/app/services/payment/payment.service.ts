import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  loadPaymentDetails = (parentId: number): Observable<Payment[]> => {
    return this.http
      .get<Payment[]>(`${environment.BASE_URL}/${parentId}/payment-details`)
      .pipe(
        catchError((error) => {
          // console.log('Error: ', error);
          return throwError(error);
        })
      );
  };
}
