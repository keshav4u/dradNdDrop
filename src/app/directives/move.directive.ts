import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { DragRxDirective } from './drag-rx.directive';
import { SafeStyle, DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@Directive({
  selector: '[appMove]'
})

export class MoveDirective extends DragRxDirective {
  @HostBinding('class.moving') moving = true;
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }
  @Input('moveReset') resetPosition = true;
  
  private position: any = { x: 0, y: 0 };
  private startPosition: any;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
  }

  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }
  @HostListener('dragEnd', ['$event']) onDragEnd(event: PointerEvent) {
    if(this.resetPosition){
      this.position = {x:0, y:0}
    }
  }
}
