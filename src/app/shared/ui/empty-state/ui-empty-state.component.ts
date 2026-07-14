import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ui-empty-state',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-empty-state.component.html',
})
export class UiEmptyStateComponent {
  @Input() icon = 'bi-inbox';
}
