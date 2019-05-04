import { Directive, Input, AfterViewInit, ElementRef } from '@angular/core';
import { ScrollStateService } from './scroll-state.service';

@Directive({
  selector: '[app-track-scroll]',
  host: {'(scroll)': 'track()'}
})
export class TrackScrollDirective implements AfterViewInit {
  @Input() identifier: string;

  constructor(private element: ElementRef, private scrollStateService: ScrollStateService) { }

  ngAfterViewInit(): void {
    if (this.identifier) {      
      this.scrollToSavedPosition();
    } else {
      console.log('app-track-scroll is missing an identifier');
    }
  }

  scrollToSavedPosition(): void {
    const scrollPosition = this.scrollStateService.getScrollPosition(this.identifier);

    setTimeout(() => {
      this.element.nativeElement.scrollTop = scrollPosition;
    }, 500);
  }

  track() {
    if (this.identifier) {
      this.scrollStateService.saveScrollPosition(this.identifier, this.element.nativeElement.scrollTop);
    }
  }  
}