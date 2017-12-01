import { TestBed, inject } from '@angular/core/testing'

import { GameModule } from './game.module'
import { GameConfigService } from './game-config.service'

describe('GameConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GameModule,
      ],
    })
  })

  it('should be created', inject([GameConfigService], (service: GameConfigService) => {
    expect(service).toBeTruthy()
  }))

  it('should define four colors', inject([GameConfigService], (gameConfig: GameConfigService) => {
    expect(gameConfig.colors.length).toBe(4)
  }))
})
