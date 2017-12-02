import { TestBed, inject } from '@angular/core/testing'

import { GameModule } from './game.module'
import { GameEngineService } from './game-engine.service'
import { GameConfigService } from './game-config.service'


function makeSequence (engine: GameEngineService, length: number) {
  for (let i = 0; i < length; ++i) {
    engine.addToSequence()
  }
}


describe('GameEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GameModule,
      ],
    })
  })

  it('should be created', inject([GameEngineService], (service: GameEngineService) => {
    expect(service).toBeTruthy()
  }))

  it('should begin with an empty sequence', inject([GameEngineService], (engine: GameEngineService) => {
    expect(engine.sequence.length).toBe(0)
  }))

  const N = 100
  it(`should generate ${N} random Simon indices within [0, number-of-simons)`, inject(
    [GameEngineService, GameConfigService],
    (engine: GameEngineService, config: GameConfigService) => {
      const UpperBound = config.numberOfSimons
      const indicies = new Array(N)
      for (let i = 0; i < N; i++) {
        indicies[i] = engine.randomSimonIndex()
      }
      expect(indicies.every(value => 0 <= value && value < UpperBound)).toBe(true)
    },
  ))

  const TestLength = 10
  it(`should add ${TestLength} Simons to the sequence`, inject([GameEngineService], (engine: GameEngineService) => {
    makeSequence(engine, TestLength)
    expect(engine.sequence.length).toBe(TestLength)
  }))

  it('should equate a sequence to its own deep clone', inject([GameEngineService], (engine: GameEngineService) => {
    makeSequence(engine, TestLength)
    expect(engine.isSequenceEqual(engine.cloneSequence())).toBe(true)
  }))
})
