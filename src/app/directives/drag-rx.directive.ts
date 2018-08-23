import { Directive, EventEmitter, HostListener, Output, OnInit, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, repeat, take } from 'rxjs/operators';

@Directive({
  selector: '[appDragRx]'
})
export class DragRxDirective implements OnInit {

  constructor() { }
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  private pointerDown = new Subject<PointerEvent>();

  private pointerMove = new Subject<PointerEvent>();

  private pointerUp = new Subject<PointerEvent>();

  @HostBinding('class.drag') drag = true;
  @HostBinding('class.dragging') dragging = false;

  @HostListener('pointerdown', ['$event'])
  onpointerdown(event: PointerEvent): void {

    this.pointerDown.next(event);
  }
  @HostListener('document:pointermove', ['$event'])
  onpointermove(event: PointerEvent): void {
    this.pointerMove.next(event);
  }
  @HostListener('document:pointerup', ['$event'])
  onpointerup(event: PointerEvent): void {
    this.pointerUp.next(event);
  }

  ngOnInit(): void {
    this.pointerDown.asObservable()
      .subscribe(event => {
        event.stopPropagation();
        this.dragging = true;
        this.dragStart.emit(event)
      });

    this.pointerDown.pipe(
      switchMap(() => this.pointerMove),
      takeUntil(this.pointerUp),
      repeat()
    ).subscribe(event => this.dragMove.emit(event));

    const dragEnd$ = this.pointerDown.pipe(
      switchMap(() => this.pointerUp),
      take(1),
      repeat()
    ).subscribe(event => {
      this.dragging = false;
      this.dragEnd.emit(event);
    });

  }
}
