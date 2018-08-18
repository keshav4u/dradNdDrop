import { Directive, EventEmitter, HostListener, Output } from '@angular/core';


@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  constructor() { }
  draggingStart: Boolean = false;
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostListener('pointerdown', ['$event'])
  onpointerdown(event: PointerEvent): void {
    this.draggingStart = true;
    this.dragStart.emit();
  }
  @HostListener('document:pointermove', ['$event'])
  onpointermove(event: PointerEvent): void {
    if (!this.draggingStart) {
      return;
    }
    this.dragMove.emit();
  }
  @HostListener('document:pointerup', ['$event'])
  onpointerup(event: PointerEvent): void {
    if (!this.draggingStart) {
      return;
    }

    this.draggingStart = false;
    this.dragEnd.emit();
  }


}
