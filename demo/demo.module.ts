import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComponent } from './demo.component';
import { RestApi } from './restApi.service';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RestApi],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
