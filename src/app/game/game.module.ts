import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../material.module'

import { GameComponent } from './game.component'
import { GameConfigService } from './game-config.service'
import { GameEngineService } from './game-engine.service'

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
  ],
  providers: [
    GameConfigService,
    GameEngineService,
  ],
})
export class GameModule { }
