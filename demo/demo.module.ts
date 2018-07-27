import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RestmodelModule } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, RestmodelModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
