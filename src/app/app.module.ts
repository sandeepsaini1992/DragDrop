import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from './_modal';
@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule,DragDropModule, ModalModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
