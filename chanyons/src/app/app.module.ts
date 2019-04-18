import { ChanyonModule } from './chanyon/chanyon.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChanyonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
