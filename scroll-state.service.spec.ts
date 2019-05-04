import { TestBed } from '@angular/core/testing';

import { ScrollStateService } from './scroll-state.service';

describe('ScrollStateService', () => {
  let service: ScrollStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(ScrollStateService);
  });
  
  it('should be created', () => {    
    expect(service).toBeTruthy();
  });

  it(`shoulo return a scroll position of 0 if none was previously saved`, () => {
    // Arrange:
    const identifier = 'foo';

    // Act:
    const result = service.getScrollPosition(identifier);

    // Assert:
    expect(result).toBe(0);
  });

  it(`should return a previously saved scroll position`, () => {
    // Arrange:
    const identifier = 'foo';
    const scrollPosition = 300;

    // Act:
    service.saveScrollPosition(identifier, scrollPosition);
    const result = service.getScrollPosition(identifier);

    // Assert:
    expect(result).toBe(scrollPosition);
  });

  it(`should be able to save and retrieve multiple scroll positions`, () => {
    // Arrange:
    const identifier1 = 'foo';
    const scrollPosition1 = 300;
    const identifier2 = 'bar';
    const scrollPosition2 = 600;

    // Act:
    service.saveScrollPosition(identifier1, scrollPosition1);
    service.saveScrollPosition(identifier2, scrollPosition2);
    const result1 = service.getScrollPosition(identifier1);
    const result2 = service.getScrollPosition(identifier2);

    // Assert:
    expect(result1).toBe(scrollPosition1);
    expect(result2).toBe(scrollPosition2);
  });
});
