import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPageComponent } from './report-page/report-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ResizeComponent } from '../shared/resize/resize.component';
import { ElementSelectorComponent } from '../shared/element-selector/element-selector.component';
import { ScreenCapturerComponent } from '../shared/screen-capturer/screen-capturer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportPageComponent,
    ReviewPageComponent,
    VideoPageComponent,
    SettingsPageComponent,
    ResizeComponent,
    ElementSelectorComponent,
    ScreenCapturerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ReportPageComponent,
    ReviewPageComponent,
    VideoPageComponent,
    SettingsPageComponent
  ]
})
export class PagesModule { }
