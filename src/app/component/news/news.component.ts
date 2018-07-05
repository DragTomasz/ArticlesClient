import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../service/news/news.service';
import {News} from '../../model/News';
import {Category} from '../../model/Category';
import {PageEvent} from '@angular/material';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private service: NewsService) {
  }

  @BlockUI() blockUI: NgBlockUI;


  private categories: Category[] = [
    {value: 'business', viewValue: 'Biznes'},
    {value: 'entertainment', viewValue: 'Rozrywka'},
    {value: 'general', viewValue: 'Ogólne'},
    {value: 'health', viewValue: 'Zdrowie'},
    {value: 'science', viewValue: 'Nauka'},
    {value: 'sports', viewValue: 'Sport'},
    {value: 'technology', viewValue: 'Technologia'},
  ];

  private countryCode: string = 'pl';
  private news: News = new News();
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  private pageEvent: PageEvent = new PageEvent();
  private selected: Category = this.categories[6];

  ngOnInit() {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 10;
    this.pageEvent.length = 0;
    this.getNews();
  }

  getNews() {
    this.blockUI.start();

    this.service.getNews(this.countryCode, this.selected.value, this.pageEvent.pageIndex+1, this.pageEvent.pageSize).subscribe(result => {
        console.log(result);
        this.news = result.body;
        this.pageEvent.length = result.headers.get('X-Total-Count');
        console.log(result.headers.get('X-Total-Count'));
      },
      response => {
        this.blockUI.stop();
        console.log('Get call in error', response);
      },
      () => {
        this.blockUI.stop();
        console.log('Observable is now completed.');
      });
  }

  compareObjects(o1: string, o2: string): boolean {
    return o1 === o2;
  }

  paginationEvent($event) {
    console.log($event);
    this.pageEvent.length = $event.length;
    this.pageEvent.pageSize = $event.pageSize;
    this.pageEvent.pageIndex = $event.pageIndex;
    this.getNews();
  }
}
