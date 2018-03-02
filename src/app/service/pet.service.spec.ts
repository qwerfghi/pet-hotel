import {inject, TestBed} from '@angular/core/testing';

import {PetService} from './pet.service';

describe('EmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetService]
    });
  });

  it('should be created', inject([PetService], (service: PetService) => {
    expect(service).toBeTruthy();
  }));
});
