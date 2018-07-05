import {NgModule} from '@angular/core';
import {BlockUIModule} from 'ng-block-ui';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule, MatInputModule, MatPaginatorModule, MatButtonModule,} from '@angular/material';
import {NewsService} from './service/news/news.service';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NewsComponent} from './component/news/news.component';
import {ArticleComponent} from './component/article/article.component';
import {ArticleListComponent} from './component/article-list/article-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ArticleComponent,
    ArticleListComponent
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot()
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
