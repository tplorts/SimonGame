import { Injectable } from '@angular/core'

import Simon from './simon'


@Injectable()
export class GameConfigService {
  private _colors: string[]
  private _simons: Simon[]

  constructor () {
    this._colors = ['green', 'red', 'yellow', 'blue']
    this._simons = this._colors.map(color => new Simon(color))
  }

  public get colors (): string[] {
    return this._colors
  }

  public get simons (): Simon[] {
    return this._simons
  }

  public get numberOfColors (): number {
    return this._colors.length
  }

  public get numberOfSimons (): number {
    return this._simons.length
  }
}
