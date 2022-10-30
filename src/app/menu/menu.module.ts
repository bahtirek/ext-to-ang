import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBtnComponent } from './select-btn/select-btn.component';
import { MenuComponent } from "./menu.component";
import { CloseBtnComponent } from './close-btn/close-btn.component';
import { VideoBtnComponent } from './video-btn/video-btn.component';
import { ReviewBtnComponent } from './review-btn/review-btn.component';
import { ReportBtnComponent } from './report-btn/report-btn.component';
import { SettingsBtnComponent } from './settings-btn/settings-btn.component';
import { StopRecordBtnComponent } from './stop-record-btn/stop-record-btn.component'
;


@NgModule({
  declarations: [
    SelectBtnComponent,
    MenuComponent,
    CloseBtnComponent,
    VideoBtnComponent,
    ReviewBtnComponent,
    ReportBtnComponent,
    SettingsBtnComponent,
    StopRecordBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
