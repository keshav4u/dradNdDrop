import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragRxDirective } from './drag-rx.directive';
import { MoveDirective } from './move.directive';
import { MovableAreaDirective } from './movable-area.directive';
import { DragHelperDirective } from './drag-helper.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DragRxDirective,
    MoveDirective,
    MovableAreaDirective,
    DragHelperDirective
  ],
  declarations: [
    DragRxDirective,
    MoveDirective,
    MovableAreaDirective,
    DragHelperDirective
  ]
})
export class DirModuleModule { }
