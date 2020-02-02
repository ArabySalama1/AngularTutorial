import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsComponent } from './stars/stars.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StarsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    StarsComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
