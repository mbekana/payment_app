import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { PaymentDetailsComponent } from './components/transactions/payment-details/payment-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { label: 'Home', icon: 'pie_chart' },
  },
  {
    path: 'transactions',
    data: { label: 'Transactions', icon: 'payment', is_child: false },
    component: TransactionsComponent,
    // children: [

    // ],
  },
  {
    path: 'transactions/:id',
    component: PaymentDetailsComponent,
    data: { label: 'Payment Details', is_child: true },
  },
  // { path: '**', redirectTo: '' }, // Redirect invalid routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
