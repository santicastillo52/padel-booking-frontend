import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-panel',
  standalone: true,
  templateUrl: './ui-panel.component.html',
})
export class UiPanelComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() wide = false;
}
