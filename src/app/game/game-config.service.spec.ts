import { TestBed, inject } from '@angular/core/testing';

import { GameConfigService } from './game-config.service';

describe('GameConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameConfigService]
    });
  });

  it('should be created', inject([GameConfigService], (service: GameConfigService) => {
    expect(service).toBeTruthy();
  }));

  it('should define four colors', inject([GameConfigService], (gameConfig: GameConfigService) => {
    expect(gameConfig.colors.length).toBe(4);
  }));
});
