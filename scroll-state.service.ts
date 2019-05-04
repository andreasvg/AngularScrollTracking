import { Injectable } from '@angular/core';

class ScrollData {
  identifer: string;
  scrollPosition: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {
  private scrollData: ScrollData[] = new Array();

  constructor() { }

  public saveScrollPosition(identifier: string, scrollPosition: number): void {
    const item = this.getScrollItem(identifier);
    item.scrollPosition = scrollPosition;
  }

  public getScrollPosition(identifer): number {
    const item = this.getScrollItem(identifer);
    return item.scrollPosition;
  }

  private getScrollItem(identifer: string): ScrollData {
    let item = this.scrollData.find(x => x.identifer === identifer);
    if (!item) {
      item = new ScrollData();
      item.identifer = identifer;
      this.scrollData.push(item);
    }
    return item;
  }
}
