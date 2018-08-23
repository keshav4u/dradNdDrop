import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DirModuleModule } from './directives/dir-module.module'
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DirModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
