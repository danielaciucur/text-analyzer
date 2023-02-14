import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TextAnalyzerModule } from './features/text-analyzer/text-analyzer.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageService } from './features/text-analyzer/storage.service';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TextAnalyzerModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [StorageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
 }]
})
export class AppModule { }
