import { TrackScrollDirective } from './track-scroll.directive';
import { ElementRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ScrollStateService } from './scroll-state.service';

describe('TrackScrollDirective', () => {
  let mockScrollStateService;
  let mockElementRef;
  let directive: TrackScrollDirective;

  beforeEach(async() => {
    mockScrollStateService = jasmine.createSpyObj(['getScrollPosition','saveScrollPosition']);

    mockElementRef = jasmine.createSpyObj(['nativeElement']);
    mockElementRef.nativeElement.and.returnValue({ scrollTop: 100 });

    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: ScrollStateService, useValue: mockScrollStateService}
      ],
      declarations: [
        TrackScrollDirective
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    directive = new TrackScrollDirective(TestBed.get(ElementRef), TestBed.get(ScrollStateService));
  });

  it('should create an instance', () => {    
    expect(directive).toBeTruthy();
  });

  describe(`track`, () => {
    it(`should not try to save the scroll position if no identifier has been set`, () => {
      // Arrange:
      directive.identifier = undefined;

      // Act:
      directive.track();

      // Assert:
      expect(mockScrollStateService.saveScrollPosition).toHaveBeenCalledTimes(0);
    });

    it(`should save the scroll position if an identifier has been set`, () => {
      // Arrange:
      directive.identifier = 'SOME_ID';      

      // Act:
      directive.track();

      // Assert:
      expect(mockScrollStateService.saveScrollPosition).toHaveBeenCalled();
    });
  });

  describe(`ngAfterViewInit`, () => {
    it(`should not get the saved scroll position from the service if an identifier has not been set`, () => {
      // Arrange:
      directive.identifier = undefined;      

      // Act:
      directive.ngAfterViewInit();

      // Assert:
      expect(mockScrollStateService.getScrollPosition).toHaveBeenCalledTimes(0);
    });

    it(`should get the saved scroll position from the service if an identifier has been set`, () => {
      // Arrange:
      directive.identifier = 'SOME_ID';      

      // Act:
      directive.ngAfterViewInit();

      // Assert:
      expect(mockScrollStateService.getScrollPosition).toHaveBeenCalled();
    });
  });
});
