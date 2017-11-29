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
  simons: Simon[]

  constructor(private gameConfig: GameConfigService) {
    this.simons = gameConfig.colors.map(color => new Simon(color))
  }

  ngOnInit() {
  }

  clickedSimon (s: Simon) {
    log.debug('clicked', s.toString());
  }
}
