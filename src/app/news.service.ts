import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsArticle } from './models/news-article.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = environment.newsApiUrl;
  private apiKey = environment.newsApiKey;

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<NewsArticle[]> {
  
    return this.http.get<{ articles: NewsArticle[] }>(`${this.apiUrl}?apiKey=${this.apiKey}&country=us`)
      .pipe(
        map(response => response.articles) 
      );
  }

  getNewsByCategory(category: string): Observable<NewsArticle[]> {
    return this.http.get<{ articles: NewsArticle[] }>(`${this.apiUrl}?category=${category}&apiKey=${this.apiKey}`)
      .pipe(
        map(response => response.articles)
      );
  }
}
