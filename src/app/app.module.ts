import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragDirective } from './drag.directive';
import { DropRxDirective } from './drop-rx.directive';

@NgModule({
  declarations: [
    AppComponent,
    DragDirective,
    DropRxDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
