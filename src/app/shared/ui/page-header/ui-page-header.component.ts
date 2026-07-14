import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-page-header',
  standalone: true,
  templateUrl: './ui-page-header.component.html',
})
export class UiPageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
