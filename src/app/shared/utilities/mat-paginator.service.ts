import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class MatPaginatorService extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Gosterim ';
  override nextPageLabel = 'Sonraki Sayfa ';
  override previousPageLabel = 'Onceki Sayfa ';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `Kayit bulunamadi.`;
    }
    length = Math.max(length, 0);
    const startIndex = page;
    return `${length} kayit icerisinden ${startIndex + 1}. sayfa  `;
  }
}
