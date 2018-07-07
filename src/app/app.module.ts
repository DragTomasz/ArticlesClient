import {LOCALE_ID, NgModule} from '@angular/core';
import {BlockUIModule} from 'ng-block-ui';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatPaginatorIntl, MatCardModule} from '@angular/material';
import {NewsService} from './service/news/news.service';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NewsComponent} from './component/news/news.component';
import {ArticleComponent} from './component/article/article.component';
import {ArticleListComponent} from './component/article-list/article-list.component';
import {MatPaginatorPl} from './component/news/mat-paginator-pl';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FooterComponent} from './component/footer/footer.component';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {NotifierModule} from 'angular-notifier';
import {LazyLoadImageModule} from 'ng-lazyload-image';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ArticleComponent,
    ArticleListComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 99,
          gap: 10
        }
      }, behaviour: {
        autoHide: 3000,
        stacking: 3
      }, animations: {

        hide: {
          preset: 'slide',
        },
      }
    }),
    LazyLoadImageModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot()
  ],
  providers: [NewsService, {provide: MatPaginatorIntl, useClass: MatPaginatorPl}, {provide: LOCALE_ID, useValue: 'pl'}],
  bootstrap: [AppComponent],
})

export class AppModule {
}
