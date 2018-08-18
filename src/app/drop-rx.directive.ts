import { Directive, EventEmitter, HostListener, Output, OnInit } from '@angular/core';
import { Subject } from '../../node_modules/rxjs';
import { switchMap, takeUntil, repeat, take } from 'rxjs/operators';

@Directive({
  selector: '[appDropRx]'
})
export class DropRxDirective implements OnInit {

  constructor() { }
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  private pointerDown = new Subject<PointerEvent>();

  private pointerMove = new Subject<PointerEvent>();

  private pointerUp = new Subject<PointerEvent>();

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
    const dragStart$ = this.pointerDown.asObservable();
    const dragMove$ = this.pointerDown.pipe(
      switchMap(()=> this.pointerMove),
      takeUntil(this.pointerUp),
      repeat()
    );
    
    const dragEnd$ = this.pointerDown.pipe(
      switchMap(()=> this.pointerUp),
      take(1),
      repeat()
    );
    dragEnd$.subscribe(()=> console.log("cdscsdc"));
  }
}
