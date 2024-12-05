import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  newsArticles: any[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || '';
      this.fetchNews(this.categoryName);
    });
  }

  fetchNews(category: string): void {
    this.newsService.getNewsByCategory(category).subscribe((response: any) => {
      this.newsArticles = response.articles;
    });
  }

  ffilteredNews() {
    if (!this.searchTerm) return this.newsArticles;
    return this.newsArticles.filter(article =>
      article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
