import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';  // NewsService dosyasını import ediyoruz
import { NewsArticle } from '../models/news-article.model';  // Haber makalesi modelini import ediyoruz

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';  // Arama terimi, ngModel ile bağlanacak
  allArticles: NewsArticle[] = [];  // Tüm haber makalelerinin depolanacağı dizi
  filteredArticles: NewsArticle[] = [];  // Arama terimine göre filtrelenmiş haberler

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchArticles();  // Component ilk açıldığında haberleri çekiyoruz
  }

  // Haberleri API'den çekmek için servis metodunu çağırıyoruz
  fetchArticles(): void {
    this.newsService.getAllArticles().subscribe(
      (data) => {
        this.allArticles = data.articles;  // API'den gelen haberleri allArticles dizisine atıyoruz
        this.filteredArticles = this.allArticles;  // Başlangıçta tüm haberler filtrelenmiş olarak gösterilsin
      },
      (error) => {
        console.error('Haberler alınırken hata oluştu:', error);  // Hata durumunda konsola yazdırıyoruz
      }
    );
  }

  // Arama terimi değiştikçe çalışacak olan metot
  onSearchChange(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredArticles = this.allArticles;  // Eğer arama terimi boşsa, tüm haberleri göster
    } else {
      // Arama terimi ile haberleri filtrele
      this.filteredArticles = this.allArticles.filter(article =>
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||  // Başlıkta terim varsa
        article.description.toLowerCase().includes(this.searchTerm.toLowerCase())  // Açıklamada terim varsa
      );
    }
  }
}
