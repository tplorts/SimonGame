import { Injectable } from '@angular/core';

import { GameConfigService } from './game-config.service';
import Simon from './simon'


@Injectable()
export class GameEngineService {
  private _sequence: Simon[];

  constructor (private gameConfig: GameConfigService) {
    this.resetGame()
  }

  public get sequence() : Simon[] {
    return this._sequence
  }

  resetGame () {
    this._sequence = []
  }

  addToSequence () {
    this._sequence.push(this.randomSimon())
  }

  randomSimon () : Simon {
    return this.gameConfig.simons[this.randomSimonIndex()]
  }

  randomSimonIndex () : number {
    return Math.floor(Math.random() * this.gameConfig.numberOfSimons)
  }

  isSequenceEqual (otherSequence: Simon[]) {
    return this.sequence && otherSequence
      && this.sequence.length === otherSequence.length
      && this.sequence.every((simon, i) => simon.equals(otherSequence[i]))
  }

  cloneSequence () : Simon[] {
    return this.sequence.map(simon => simon.clone())
  }
}
