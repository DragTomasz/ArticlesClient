import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://localhost:8888/news/';

  getNews(country: string, category: string, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.url + country + '/' + category, {
      observe: 'response',
      headers: new HttpHeaders({
        'page': page.toString(),
        'page-size': pageSize.toString(),
      })
    });
  }
}
