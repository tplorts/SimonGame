import { Injectable } from '@angular/core'

import { Synth } from 'tone'


@Injectable()
export class ToneService {
  private _synth: any

  constructor () {
    this._synth = new Synth().toMaster()
  }

  public get synth (): any {
    return this._synth
  }
}
