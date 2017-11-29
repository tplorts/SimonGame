import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { GameComponent } from './game.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    GameComponent,
  ],
  exports: [
    GameComponent,
  ]
})
export class GameModule { }
