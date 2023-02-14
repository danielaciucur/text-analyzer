import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TextInput } from './features/text-analyzer/models/input.model';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { TextAnalyzerUtils } from './features/text-analyzer/text-analyzer.utils';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';

@Injectable({
  providedIn: 'root',
})
export class TextAnalyzerService {

  readonly textAnalyzerUrl = 'http://localhost:8080/analyze-text';

  public localErrorMessage: string;

  constructor(private http: HttpClient) {}

  public getHttpAnalyzedText(input: TextInput): Observable<Map<string, string[]>> {
    return this.http.post<Map<string, string[]>>(this.textAnalyzerUrl, input);
  }

  public getLocalAnalyzedText(input: TextInput): Observable<Map<string, string[]>> {
    this.localErrorMessage = null;
    try {
      return of(TextAnalyzerUtils.analyzeText(input));
    } catch(error) {
      this.localErrorMessage = error.message;
      return of();
    }
   
  }


}
