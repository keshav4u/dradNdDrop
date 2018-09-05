import { Directive, QueryList, AfterContentInit, ContentChildren, ElementRef } from '@angular/core';
import { MoveDirective } from './move.directive';
import { Subscription } from 'rxjs';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit {

  @ContentChildren(MoveDirective) moves: QueryList<MoveDirective>;

  private boundaries: Boundaries;
  private subscriptions: Subscription[] = [];

  constructor(private element: ElementRef){}

  ngAfterContentInit(): void {
    this.moves.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      this.moves.forEach(move => {
        this.subscriptions.push(move.dragStart.subscribe(() => this.measureBoundaries(move)));
        this.subscriptions.push(move.dragMove.subscribe(() => this.maintainBoundaries(move)));
      });
    });

    this.moves.notifyOnChanges();
  }
  private measureBoundaries(move: MoveDirective) {
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const moveClientRect: ClientRect = move.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - moveClientRect.left + move.position.x,
      maxX: viewRect.right - moveClientRect.right + move.position.x,
      minY: viewRect.top - moveClientRect.top + move.position.y,
      maxY: viewRect.bottom - moveClientRect.bottom + move.position.y
    };
  }
  private maintainBoundaries(move: MoveDirective) {
    move.position.x = Math.max(this.boundaries.minX, move.position.x);
    move.position.x = Math.min(this.boundaries.maxX, move.position.x);
    move.position.y = Math.max(this.boundaries.minY, move.position.y);
    move.position.y = Math.min(this.boundaries.maxY, move.position.y);
  }
}
