import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../service/news/news.service';
import {News} from '../../model/News';
import {Category} from '../../model/Category';
import {PageEvent} from '@angular/material';
import {AlertsService} from 'angular-alert-module';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {Error} from '../../model/Error';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private service: NewsService, private alerts: AlertsService) {
  }

  @BlockUI() blockUI: NgBlockUI;

  private errorMap = new Map();
  private categories: Category[] = [ // is used!
    {value: 'business', viewValue: 'Biznes'},
    {value: 'science', viewValue: 'Nauka'},
    {value: 'general', viewValue: 'Ogólne'},
    {value: 'entertainment', viewValue: 'Rozrywka'},
    {value: 'sports', viewValue: 'Sport'},
    {value: 'technology', viewValue: 'Technologia'},
    {value: 'health', viewValue: 'Zdrowie'}
  ];

  private countryCode: string = 'pl';
  private news: News = new News();
  private pageSizeOptions: number[] = [3, 5, 10, 20]; // is used!
  private pageEvent: PageEvent = new PageEvent();
  private selected: Category = {value: 'technology', viewValue: 'Technologia'};

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
        this.blockUI.stop();
        this.alerts.setMessage(this.getErrorMessage(response.error), 'error');
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
    return this.errorMap.get(error.status.toString());
  }

  private setDefaultValues() {
    this.errorMap.set('424', 'Niestety nie udało się pobrać wiadomości');
    this.alerts.setDefaults('timeout', 4);
    this.alerts.setConfig('warn', 'icon', 'warning');
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.pageEvent.length = 0;
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
