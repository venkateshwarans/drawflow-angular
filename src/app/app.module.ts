import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawBoardComponent } from './draw-board/draw-board.component';
import { CdkDrawBoardComponent } from './cdk-draw-board/cdk-draw-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [AppComponent, DrawBoardComponent, CdkDrawBoardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatSidenavModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
