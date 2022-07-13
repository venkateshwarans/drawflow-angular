import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkDrawBoardComponent } from './cdk-draw-board/cdk-draw-board.component';
import { DrawBoardComponent } from './draw-board/draw-board.component';

const routes: Routes = [
  {
    path: 'draw', component: DrawBoardComponent
  },
  {
    'path': 'cdk', component: CdkDrawBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
