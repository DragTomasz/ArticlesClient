import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../service/news/news.service';
import {News} from '../../model/News';
import {Category} from '../../model/Category';
import {PageEvent} from '@angular/material';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {Error} from '../../model/Error';
import {NotifierService} from 'angular-notifier';
import {isUndefined} from 'util';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private readonly notifier: NotifierService;

  constructor(private service: NewsService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  @BlockUI() blockUI: NgBlockUI;

  errorMap = new Map();
  categories: Category[] = [
    {value: 'business', viewValue: 'Biznes'},
    {value: 'science', viewValue: 'Nauka'},
    {value: 'general', viewValue: 'Ogólne'},
    {value: 'entertainment', viewValue: 'Rozrywka'},
    {value: 'sports', viewValue: 'Sport'},
    {value: 'technology', viewValue: 'Technologia'},
    {value: 'health', viewValue: 'Zdrowie'}
  ];

  countryCode = 'pl';
  news: News = new News();
  pageSizeOptions: number[] = [3, 5, 10, 20];
  pageEvent: PageEvent = new PageEvent();
  selected: Category = {value: 'technology', viewValue: 'Technologia'};

  ngOnInit() {
    this.setDefaultValues();
    this.getNews();
  }

  getNews() {
    this.blockUI.start();
    this.service.getNews(this.countryCode, this.selected.value, this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).subscribe(result => {
        this.news = result.body;
        this.pageEvent.length = result.headers.get('X-Total-Count');
      },
      response => {
        console.log('jestem');
        this.blockUI.stop();
        this.notifier.notify('error', this.getErrorMessage(response.error));
      },
      () => {
        this.blockUI.stop();
      });
  }

  compareObjects(o1: string, o2: string): boolean {
    return o1 === o2;
  }

  getNewsOnCategoryChange() {
    this.pageEvent.pageIndex = 0;
    this.getNews();
  }

  paginationEvent($event) {
    this.pageEvent.length = $event.length;
    this.pageEvent.pageSize = $event.pageSize;
    this.pageEvent.pageIndex = $event.pageIndex;
    this.getNews();
  }

  getErrorMessage(error: Error): string {
    return isUndefined(error.status) ? this.errorMap.get('0') : this.errorMap.get(error.status.toString());
  }

  private setDefaultValues() {
    this.errorMap.set('424', 'Niestety nie udało się pobrać wiadomości');
    this.errorMap.set('0', 'Niestety nie udało się pobrać wiadomości');
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.pageEvent.length = 0;
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
