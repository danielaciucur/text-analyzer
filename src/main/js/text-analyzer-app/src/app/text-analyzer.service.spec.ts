import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';


import { TextInput } from './features/text-analyzer/models/input.model';
import { TextAnalyzerService } from './text-analyzer.service'
import { defer } from 'rxjs';

describe ('TextAnalyzerService (with spies)', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let textAnalyzerService: TextAnalyzerService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    textAnalyzerService = new TextAnalyzerService(httpClientSpy);
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const textInput = new TextInput("aaa", true, false);
    const expectedResult = new Map<string, string[]>();
    expectedResult.set("Online analysis: Your input:" + textInput.inputText, ["Letter 'E' appears 3 times"]);
    httpClientSpy.post.and.returnValue(asyncData(expectedResult));

    textAnalyzerService.getHttpAnalyzedText(textInput).subscribe({
      next: result => {
        expect(result)
          .withContext('expected result')
          .toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });


}); 


/* describe('HeroesService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let textAnalyzerService: TextAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ TextAnalyzerService ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    textAnalyzerService = TestBed.inject(TextAnalyzerService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  
  /// TextAnalyzerService methods tests begin ///
  describe('#analyzeText', () => {
    beforeEach(() => {
      textAnalyzerService = TestBed.inject(TextAnalyzerService);
    });

    it('should return expected result with vowels analysis', () => {
      const textInput = new TextInput("aaa%(&*&)&(^76", true, false);
      const expectedResult = new Map<string, string[]>();
      expectedResult.set("Online analysis: Your input:" + textInput.inputText, ["Letter 'E' appears 3 times"]);

      textAnalyzerService.getHttpAnalyzedText(textInput).subscribe({
        next: result => expect(result)
          .withContext('should return expected result with vowels analysis')
          .toEqual(expectedResult),
        error: fail
      });

      const req = httpTestingController.expectOne(textAnalyzerService.textAnalyzerUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock heroes
      req.flush(expectedResult);
    });

    it('should return expected result with consonants analysis', () => {
      const textInput = new TextInput("fff%*^(*^(&(&)*&*", false, true);
      const expectedResult = new Map<string, string[]>();
      expectedResult.set("Online analysis: Your input:" + textInput.inputText, ["Letter 'F' appears 3 times"]);

      textAnalyzerService.getHttpAnalyzedText(textInput).subscribe({
        next: result => expect(result)
          .withContext('should return expected result with consonants analysis')
          .toEqual(expectedResult),
        error: fail
      });

      const req = httpTestingController.expectOne(textAnalyzerService.textAnalyzerUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock heroes
      req.flush(expectedResult);
    });

    it('should return expected result with vowels and consonants analysis', () => {
      const textInput = new TextInput("fff%*^(*^(&(&)*&*", false, true);
      const expectedResult = new Map<string, string[]>();
      expectedResult.set("Online analysis: Your input:" + textInput.inputText, ["Letter 'F' appears 3 times"]);

      textAnalyzerService.getHttpAnalyzedText(textInput).subscribe({
        next: result => expect(result)
          .withContext('should return expected result with consonants analysis')
          .toEqual(expectedResult),
        error: fail
      });

      const req = httpTestingController.expectOne(textAnalyzerService.textAnalyzerUrl);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock heroes
      req.flush(expectedResult);
    });
  });

});  */

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
