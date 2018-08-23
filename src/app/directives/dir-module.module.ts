import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragRxDirective } from './drag-rx.directive';
import { MoveDirective } from './move.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DragRxDirective,
    MoveDirective
  ],
  declarations: [
    DragRxDirective,
    MoveDirective
  ]
})
export class DirModuleModule { }
