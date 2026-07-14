import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

export type UiButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
export type UiButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './ui-button.component.html',
})
export class UiButtonComponent {
  @Input() variant: UiButtonVariant = 'primary';
  @Input() size: UiButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() routerLink?: string | unknown[];

  get classes(): Record<string, boolean> {
    return {
      'ui-btn': true,
      [`ui-btn--${this.variant}`]: true,
      [`ui-btn--${this.size}`]: this.size !== 'md',
      'ui-btn--full': this.fullWidth,
    };
  }
}
