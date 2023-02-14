import { TextAnalyzerComponent } from './components/text-analyzer.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { StorageService } from './storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorCatchingInterceptor } from 'src/app/interceptors/error-catching.interceptor';

@NgModule({
  declarations: [TextAnalyzerComponent],
  imports: [
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatDividerModule
  ],
  exports: [TextAnalyzerComponent]
})
export class TextAnalyzerModule {}
