import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StartUploadComponent } from './start-upload/start-upload.component';
import { DndDirective } from './directives/dnd.directive';

@NgModule({
  declarations: [
    AppComponent,
    StartUploadComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
