import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() displayedColumns: string[] | undefined;
  @Input() showNavigateButton: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() showPageSizeOptions: boolean = true;
  @Input() pageSizeOptions?: number[] = [];
  @Input() length?: number;
  @Input() child?: boolean;
  @Input() showDetails?: boolean = false; // new input property
  @Output() navigateToPaymentDetails = new EventEmitter<number>();
  @Output() pageChanged = new EventEmitter<PageEvent>();

  pageSize: number = 2;
  pageIndex: number = 0;
  totalItems: number = 0;

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChanged.emit(event);
  }
  onNavigateToPaymentDetails(id: number) {
    this.navigateToPaymentDetails.emit(id);
  }
}
