import { TestBed } from '@angular/core/testing';

import { AlertMessageHandlerService } from './alert-message-handler.service';

describe('AlertMessageHandlerService', () => {
  let service: AlertMessageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertMessageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
