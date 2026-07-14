import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type UiBadgeVariant = 'blue' | 'dark' | 'outline';

@Component({
  selector: 'app-ui-badge',
  standalone: true,
  imports: [NgClass],
  template: `<span [ngClass]="classes"><ng-content /></span>`,
})
export class UiBadgeComponent {
  @Input() variant: UiBadgeVariant = 'blue';

  get classes(): Record<string, boolean> {
    return {
      'ui-badge': true,
      [`ui-badge--${this.variant}`]: true,
    };
  }
}
