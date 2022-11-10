import { Component, OnInit } from '@angular/core';
import { Screenshot } from 'src/app/interfaces/screenshot.interface';
import { ScreenshotService } from 'src/app/services/screenshot.service';
import { ToggleExtensionService } from 'src/app/services/toggle-extension.service';
import { UnsavedBugStorageService } from 'src/app/services/unsaved-bug-storage.service';

@Component({
  selector: 'app-screen-capturer',
  templateUrl: './screen-capturer.component.html',
  styleUrls: ['./screen-capturer.component.less']
})
export class ScreenCapturerComponent implements OnInit {

  constructor(private screenshotService: ScreenshotService, private toggleExtension: ToggleExtensionService, private unsavedBugStorage: UnsavedBugStorageService) { }

  ngOnInit(): void {
    this.screenshots = this.unsavedBugStorage.getScreenshots()
  }

  screenshot: Screenshot = new Screenshot('', '');
  screenshots: Screenshot[] = [];
  filename: string = '';
  isCaptured: boolean = true;
  isScreenshotActive: boolean = false;

  onScreenshotBtnClick() {
    this.isScreenshotActive = !this.isScreenshotActive;
    this.getScreenshot();
  }

  getScreenshot(){
    this.screenshot = new Screenshot('', '');
    this.toggleExtension.toggle.next(true)
    this.screenshotService.getScreenshot()
      .then(response => {
        console.log('promise screenshot', response.imgSrc);
        this.setScreenshot(response.imgSrc);
      })
      .catch(error => {
        console.log(error);
        this.toggleExtension.toggle.next(false);
      });
  }

  setScreenshot(imgSrc: string) {
    this.screenshot.imgSrc = imgSrc;
    this.screenshot.filename = `screenshot-${Date.now()}`;
    this.toggleExtension.toggle.next(false);
  }

  saveScreenshot() {
    this.screenshots.push(this.screenshot);
    this.screenshot = new Screenshot('', '');
    this.isScreenshotActive = !this.isScreenshotActive;
    this.unsavedBugStorage.addScreenshots(this.screenshots);
  }

  onDeleteScreenshot(filename: string){
    this.screenshots = this.screenshots.filter(screenshot => screenshot.filename != filename);
    console.log(this.screenshot);
    //this.screenshots = this.screenshots.slice(index, 1);
    //console.log(this.screenshot);
    this.unsavedBugStorage.addScreenshots(this.screenshots);
  }

  downloadImage(index: number){
    this.screenshotService.screenshotLink('ui-br-ext-download-image-full', this.screenshots[index].imgSrc, this.screenshots[index].filename);
  }

}

