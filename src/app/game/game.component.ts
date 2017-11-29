import { Component, OnInit } from '@angular/core';

import { Logger } from '../core/logger.service';

import { GameConfigService } from './game-config.service';
import Simon from './simon'


const log = new Logger('Game');


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameConfig: GameConfigService) {
  }

  public get simons() : Simon[] {
    return this.gameConfig.simons
  }

  ngOnInit() {
  }

  clickedSimon (s: Simon) {
    log.debug('clicked', s.toString());
  }
}
