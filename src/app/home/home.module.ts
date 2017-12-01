import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FlexLayoutModule } from '@angular/flex-layout'

import { MaterialModule } from '../material.module'
import { CoreModule } from '../core/core.module'
import { SharedModule } from '../shared/shared.module'
import { GameModule } from '../game/game.module'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    GameModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
  ],
})
export class HomeModule { }
