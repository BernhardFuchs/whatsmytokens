import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { TokenTableViewItem } from 'src/app/dapp-store/token-table.state.model';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';

/**
 * Data source for the TokenTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable({
  providedIn: 'root'
})
export class TokenTableDataSource extends DataSource<TokenTableViewItem> {
  _dataChange: BehaviorSubject<TokenTableViewItem[]> = new BehaviorSubject<
    TokenTableViewItem[]
  >([]);
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: TokenTableViewItem[] = [];
  renderedData: TokenTableViewItem[] = [];

  constructor(
    public _internalService: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TokenTableViewItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this._dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._internalService.getAllItems().subscribe(data => {
      this._dataChange.next(data);
    });

    return merge(...dataMutations).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._dataChange.value
          .slice()
          .filter((item: TokenTableViewItem) => {
            const searchStr = (item.symbol + item.name).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.getSortedData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        this.renderedData = this.getPagedData(sortedData);
        return this.renderedData;
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  private adjustPaginatorValues(startIndex: number): void {
    if (this._dataChange.value.length < startIndex) {
      this._paginator.pageIndex = 0;
    }
  }
  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TokenTableViewItem[]): TokenTableViewItem[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    this.adjustPaginatorValues(startIndex);
    return data.splice(startIndex, this._paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TokenTableViewItem[]): TokenTableViewItem[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this._sort.direction === 'asc';
      switch (this._sort.active) {
        case 'symbol':
          return compare(a.symbol, b.symbol, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
