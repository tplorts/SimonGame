import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { Logger } from '../core/logger.service';
import Tone from 'tone'

import { GameConfigService } from './game-config.service';
import { GameEngineService } from './game-engine.service';
import Simon from './simon'


const log = new Logger('Game');


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  flashingSimon: Simon
  synth: any

  constructor(
    private gameConfig: GameConfigService,
    private gameEngine: GameEngineService
  ) {
    this.flashingSimon = null;
    this.synth = new Tone.Synth().toMaster();
  }

  public get simons() : Simon[] {
    return this.gameConfig.simons
  }

  ngOnInit() {
  }

  beginGame () {
    this.gameEngine.addToSequence()
    this.flashSequence()
  }

  async flashSequence () {
    for (const simon of this.gameEngine.sequence) {
      await this.flashSimon(simon)
    }
  }

  async playTone (simon: Simon) {
    this.synth.triggerAttackRelease(simon.tone, "8n");
  }

  async flashSimon (simon: Simon) {
    this.flashingSimon = simon
    this.playTone(simon);
    await this.timerPromise(600)
    this.flashingSimon = null
    await this.timerPromise(600)
  }

  timerPromise (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  clickedSimon (s: Simon) {
    log.debug('clicked', s.toString());
  }
}
