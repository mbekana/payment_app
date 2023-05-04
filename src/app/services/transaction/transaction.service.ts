import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TransactionResponse } from 'src/app/models/transaction';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  loadTransactions = (
    pageIndex: number,
    pageSize: number
  ): Observable<TransactionResponse> => {
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`);
    return this.http
      .get<TransactionResponse>(`${environment.BASE_URL}/transactions`, {
        params: params,
      })
      .pipe(
        catchError((error) => {
          console.log('Error: ', error);
          return throwError(error);
        })
      );
  };
}
