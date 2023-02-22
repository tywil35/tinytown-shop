/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnData } from './column-data.inteface';
import type { SearchMode } from './search-mode.type';
import type { TableAction } from './table-action.type';
import {
    MatchSearch,
    WildSearch,
    SearchNumber
} from '@/utils/search.util';
export class TableData {
    data: any[] = [];
    columns: ColumnData[] = [];
    actions: TableAction[] = [];
    batch: 1 | 5 | 10 | 25 | 50 | 150 = 10;
    numberOfPages = 1;
    pageNumbers: number[] = [];
    maxPageNumbers = 3;
    currentPage = 1;
    currentData: any[] = [];
    resetTable(): void {
        this.pages();
        this.loadPage(this.currentPage);
    }
    pages(): void {
        this.pageNumbers = [];
        const pageNumbers = Math.ceil(this.data.length / this.batch);
        for (let index = 0; index < pageNumbers; index++) {
            this.pageNumbers.push(index + 1);
        }
    }
    assignCustomBatch(rowsPerPage: 1 | 5 | 10 | 25 | 50 | 150) {
        this.batch = rowsPerPage;
        this.resetTable();
    }
    sort(column: ColumnData) {
        this.data = this.data.sort((a: any, b: any) => {
            if (column.asc === true) {
                return (a[column.key] <= b[column.key] ? -1 : 1);
            }
            return (a[column.key] >= b[column.key] ? -1 : 1);
        });
        this.loadPage(this.currentPage);
    }
    showPageNumbers(): number[] {
        if (this.pageNumbers.length <= this.maxPageNumbers) {
            return this.pageNumbers;
        }
        if (!this.showMoreAfterPageNumber()) {
            return this.pageNumbers.slice(this.pageNumbers.length - this.maxPageNumbers, this.pageNumbers.length);
        }
        if (this.currentPage === this.pageNumbers.length) {
            return this.pageNumbers.slice(this.currentPage - this.maxPageNumbers, this.currentPage);
        }
        return this.pageNumbers.slice(this.currentPage - 1, this.currentPage + this.maxPageNumbers);
    }
    showMoreBeforePageNumber(): boolean {
        if (this.pageNumbers.length <= this.maxPageNumbers) {
            return false;
        }
        return this.currentPage > 1;
    }
    showMoreAfterPageNumber(): boolean {
        if (this.pageNumbers.length <= this.maxPageNumbers) {
            return false;
        }
        return this.currentPage <= this.pageNumbers.length - this.maxPageNumbers;
    }

    search(term: string | number, column: string, mode: SearchMode = 'match'): any[] {
        const found = this.data.filter((d) => {
            if (typeof d[column] === 'string') {
                const cast_term = term as string;
                return mode === 'match' ? MatchSearch(cast_term, d[column]) : WildSearch(cast_term, d[column]);
            }
            return SearchNumber(+term, d[column], mode);
        });
        return found;
    }

    loadPage(pageNumber: number) {
        const start = ((pageNumber - 1) * this.batch);
        const end = start + this.batch;
        this.currentData = this.data.slice(start, end);
        this.currentPage = pageNumber;
    }

    nextPage() {
        if (this.currentPage === this.pageNumbers[this.pageNumbers.length - 1]) {
            this.loadPage(1);
            return;
        }
        this.loadPage(this.currentPage + 1);
    }

    previousPage() {
        if (this.currentPage === 1) {
            this.loadPage(this.pageNumbers.length);
            return;
        }
        this.loadPage(this.currentPage - 1);
    }
}