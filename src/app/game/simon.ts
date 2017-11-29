export default class Simon {
  constructor (
    private color: string
  ) {}

  style () {
    return { backgroundColor: this.color }
  }

  toString (): string {
    return `Simon ${this.color}`
  }
}