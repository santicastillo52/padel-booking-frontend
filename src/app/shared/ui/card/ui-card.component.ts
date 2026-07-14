import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  templateUrl: './ui-card.component.html',
})
export class UiCardComponent {
  @Input() title = '';
  @Input() hoverable = true;
  @Input() clickable = false;

  @Output() cardClick = new EventEmitter<void>();

  onClick(): void {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }
}
