import { Injectable } from '@angular/core';

@Injectable()
export class GameConfigService {
  private _colors: string[]

  constructor() {
    this._colors = ['green', 'red', 'yellow', 'blue']
  }

  public get colors() : string[] {
    return this._colors
  }
}
