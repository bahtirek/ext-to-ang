import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPageComponent } from './report-page/report-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ResizeComponent } from '../shared/resize/resize.component';



@NgModule({
  declarations: [
    ReportPageComponent,
    ReviewPageComponent,
    VideoPageComponent,
    SettingsPageComponent,
    ResizeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReportPageComponent,
    ReviewPageComponent,
    VideoPageComponent,
    SettingsPageComponent
  ]
})
export class PagesModule { }
