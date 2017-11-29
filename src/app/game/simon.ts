export default class Simon {
  constructor (
    private color: string
  ) {}

  style () {
    return { backgroundColor: this.color }
  }

  toString () : string {
    return `Simon ${this.color}`
  }

  equals (other: Simon) : boolean {
    return this.color === other.color
  }

  clone () : Simon {
    return new Simon(this.color)
  }
}