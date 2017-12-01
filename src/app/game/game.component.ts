import { Component, OnInit } from '@angular/core'
import Tone from 'tone'

import { Logger } from '../core/logger.service';
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
  isGameRunning: boolean

  timeBetweenRuns: number
  flashTime: number
  timeBetweenFlashes: number

  constructor(
    private gameConfig: GameConfigService,
    private gameEngine: GameEngineService
  ) {
    this.flashingSimon = null;
    this.synth = new Tone.Synth().toMaster();
    this.isGameRunning = false

    this.timeBetweenRuns = 500
    this.flashTime = 400
    this.timeBetweenFlashes = 300
  }

  public get simons() : Simon[] {
    return this.gameConfig.simons
  }

  ngOnInit() {
  }

  async beginGame () {
    this.isGameRunning = true
    await this.startNextRun()
  }

  endGame () {
    log.debug('Game round ended.')
    this.gameEngine.resetGame()
    this.isGameRunning = false
  }

  async startNextRun() {
    this.gameEngine.startNextRun()
    await this.timerPromise(this.timeBetweenRuns)
    await this.playSequence()
  }

  async playSequence () {
    for (const simon of this.gameEngine.sequence) {
      this.playTone(simon);
      await this.flashSimon(simon)
    }
  }

  async playTone (simon: Simon) {
    this.synth.triggerAttackRelease(simon.tone, '8n');
  }

  async flashSimon (simon: Simon) {
    this.flashingSimon = simon
    await this.timerPromise(this.flashTime)
    this.flashingSimon = null
    await this.timerPromise(this.timeBetweenFlashes)
  }

  timerPromise (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  clickedSimon (simon: Simon) {
    log.debug('clicked', simon.toString());
    if (this.isGameRunning) {
      if (this.gameEngine.nextSimon.equals(simon)) {
        if (this.gameEngine.isSequenceComplete()) {
          log.debug('finished run')
          this.startNextRun()
        } else {
          log.debug('correct')
        }
      } else {
        log.debug('wrong')
        this.endGame()
      }
    }
  }
}
