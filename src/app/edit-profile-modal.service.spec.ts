import { TestBed } from '@angular/core/testing';

import { EditProfileModalService } from './edit-profile-modal.service';

describe('EditProfileModalService', () => {
  let service: EditProfileModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
