import { TestBed } from '@angular/core/testing';

import { SearchAnimalService } from './search-animal.service';

describe('SearchAnimalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchAnimalService = TestBed.get(SearchAnimalService);
    expect(service).toBeTruthy();
  });
});
