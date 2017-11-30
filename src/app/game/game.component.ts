import { Component, OnInit } from '@angular/core';
import { Logger } from '../core/logger.service';
import Tone from 'tone'

import { GameConfigService } from './game-config.service';
import { GameEngineService } from './game-engine.service';
import Simon from './simon'


const log = new Logger('Game');
const NoOp = () => {}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  flashingSimon: Simon
  synth: any
  resolveUserSelection: Function
  isGameRunning: boolean

  constructor(
    private gameConfig: GameConfigService,
    private gameEngine: GameEngineService
  ) {
    this.flashingSimon = null;
    this.synth = new Tone.Synth().toMaster();
    this.resolveUserSelection = null
    this.isGameRunning = false
  }

  public get simons() : Simon[] {
    return this.gameConfig.simons
  }

  ngOnInit() {
  }

  async beginGame () {
    this.isGameRunning = true
    let madeMistake = false
    while (!madeMistake) {
      this.gameEngine.addToSequence()
      await this.flashSequence()
      try {
        await this.checkSequence()
        log.debug('Correct.  Moving on.')
        await this.timerPromise(400)
      } catch (err) {
        log.debug('Incorrect.  Round over.')
        madeMistake = true
      }
    }
    log.debug('Game round ends.')
    this.gameEngine.resetGame()
    this.isGameRunning = false
  }

  async checkSequence () {
    for (const correctSimon of this.gameEngine.sequence) {
      const selectedSimon: Simon = await this.userSelection()
      if (!selectedSimon.equals(correctSimon)) {
        throw new Error('incorrect simon selection')
      }
    }
  }

  async flashSequence () {
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
    await this.timerPromise(600)
    this.flashingSimon = null
    await this.timerPromise(600)
  }

  timerPromise (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  clickedSimon (simon: Simon) {
    log.debug('clicked', simon.toString());
    const resolveUserSelection = this.resolveUserSelection || NoOp
    this.resolveUserSelection = null
    resolveUserSelection(simon)
  }

  userSelection () : Promise<Simon> {
    return new Promise((resolve, reject) => {
      this.resolveUserSelection = resolve
    })
  }
}
