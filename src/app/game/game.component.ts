import { Component, OnInit } from '@angular/core';

import { Logger } from '../core/logger.service';

import Simon from './simon'


const log = new Logger('Game');


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  simons: Simon[]

  constructor() {
    const SimonColors = ['red', 'green', 'yellow', 'blue']
    this.simons = SimonColors.map(color => new Simon(color))
  }

  ngOnInit() {
  }

  clickedSimon (s: Simon) {
    log.debug('clicked', s.toString());
  }
}
