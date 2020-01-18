import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BorderDirective } from './directives/border.directive.ts';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BorderDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
