import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Drag and Drop';
  onDragStart(): void{
    console.log("drag start");
  }
  onDragMove(event: PointerEvent): void{
    console.log("drag move");
  }
  onDragEnd(): void{
    console.log("drag end");
  }
}
