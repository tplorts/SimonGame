import { TestBed, inject } from '@angular/core/testing';

import { GameModule } from './game.module';
import { GameEngineService } from './game-engine.service';


function makeSequence (engine: GameEngineService, length: number) {
  for (let i = 0; i < length; ++i) {
    engine.addToSequence()
  }
}


describe('GameEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GameModule
      ],
    });
  });

  it('should be created', inject([GameEngineService], (service: GameEngineService) => {
    expect(service).toBeTruthy();
  }));

  it('should begin with an empty sequence', inject([GameEngineService], (engine: GameEngineService) => {
    expect(engine.sequence.length).toBe(0);
  }));

  const TestLength = 10
  it(`should add ${TestLength} Simons to the sequence`, inject([GameEngineService], (engine: GameEngineService) => {
    makeSequence(engine, TestLength)
    expect(engine.sequence.length).toBe(TestLength);
  }));

  it('should equate a sequence to its own deep clone', inject([GameEngineService], (engine: GameEngineService) => {
    makeSequence(engine, TestLength)
    expect(engine.isSequenceEqual(engine.cloneSequence())).toBe(true);
  }));
});
