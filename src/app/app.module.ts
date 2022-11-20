import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ExtensionComponent } from './extension/extension.component';
import { MenuModule } from './menu/menu.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    selectButtonComponent?: any;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ExtensionComponent,
  ],
  imports: [
    BrowserModule,
    MenuModule,
    PagesModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
