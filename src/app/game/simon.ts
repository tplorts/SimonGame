const toneMap = {
  green: 'C4',
  red: 'D4',
  yellow: 'E4',
  blue: 'F4',
}

export default class Simon {
  private _tone: string

  constructor (
    private _color: string,
  ) {
    this._tone = toneMap[_color]
  }

  public get tone (): string {
    return this._tone
  }

  public style () {
    return { backgroundColor: this._color }
  }

  public toString (): string {
    return `Simon ${this._color}`
  }

  public equals (other: Simon): boolean {
    return !!other && this._color === other._color
  }

  public clone (): Simon {
    return new Simon(this._color)
  }
}
