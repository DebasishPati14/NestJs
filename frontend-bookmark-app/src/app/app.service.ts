import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  getBookmark() {
    const data = {
      orderBy: 'asc',
      pageOffset: {
        pageNumber: 1,
        pageSize: 2,
      },
      searchText: 't',
    };

    // this.httpClient.get('http://localhost:8080/bookmark/all-bookmarks', {
    //   params: data,
    // });
    return { data: 'Hello' };
  }
}
