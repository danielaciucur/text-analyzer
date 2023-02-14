import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  flatMap,
  from,
  map,
  mergeMap,
  mergeMapTo,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { TextAnalyzerService } from 'src/app/text-analyzer.service';
import { TextInput } from '../models/input.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-text-analyzer',
  templateUrl: './text-analyzer.component.html',
  styleUrls: ['./text-analyzer.component.scss'],
})
export class TextAnalyzerComponent implements OnInit, OnDestroy {
  textAnalyzerForm: FormGroup;
  analyzedText$ = new Observable<Map<string, string[]>>();
  localStorageItems: Map<string, string[]>;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private textAnalyzerService: TextAnalyzerService,
    private toastr: ToastrService
  ) {
    this.storageService
      .getAll()
      .subscribe((result) => (this.localStorageItems = result));
  }

  ngOnInit(): void {
    this.textAnalyzerForm = this.fb.group({
      inputText: ['', Validators.required],
      toggleOnline: [true],
    });
  }

  checkForVowels() {
    this.setTextAnalysisType(
      new TextInput(
        this.textAnalyzerForm.controls['inputText']?.value,
        true,
        false
      )
    );
  }

  checkForConsonants() {
    this.setTextAnalysisType(
      new TextInput(
        this.textAnalyzerForm.controls['inputText']?.value,
        false,
        true
      )
    );
  }

  checkBoth() {
    this.setTextAnalysisType(
      new TextInput(
        this.textAnalyzerForm.controls['inputText']?.value,
        true,
        true
      )
    );
  }

  private setTextAnalysisType(input: TextInput) {
    this.textAnalyzerService.localErrorMessage = null;
    if (this.textAnalyzerForm.controls['toggleOnline'].value) {
      this.analyzedText$ = this.textAnalyzerService.getHttpAnalyzedText(input);
    } else {
      this.analyzedText$ = this.textAnalyzerService.getLocalAnalyzedText(input);
    }

    if (this.textAnalyzerService.localErrorMessage != null) {
      this.toastr.error(this.textAnalyzerService.localErrorMessage);
    }

    this.persistAnalysisHistory();
  }

  public persistAnalysisHistory() {
    this.analyzedText$
      .pipe(
        catchError((err) => {
          return of(new Map());
        }),
        switchMap((result) => {
          result instanceof Map
            ? result.forEach((value, key) => {
                localStorage.setItem(key, JSON.stringify(value));
              })
            : Object.keys(result).forEach((key) => {
                localStorage.setItem(key, result[key]);
              });

          return this.storageService.getAll();
        })
      )
      .subscribe((result) => {
        console.log(result);
        this.localStorageItems = result });
  }

  public clearStorage() {
    this.storageService.clear().subscribe();
    this.localStorageItems = new Map();
  }

  ngOnDestroy() {}
}
