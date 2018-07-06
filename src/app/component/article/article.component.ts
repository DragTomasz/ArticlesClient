import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../model/Article';
import {isNull} from 'util';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article;

  constructor() {
  }

  ngOnInit() {
  }

  onNavigate(url: string) {
    window.open(url, '_blank');
  }

  setAuthorName(name: string): string {
    if (isNull(name) || (name.length == 0)) {
      return 'Autor nieznany';
    } else {
      return name;
    }
  }
}
