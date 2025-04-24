import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'success-message',
    template: `
    <div class="success" *ngIf="successMessage">
         {{successMessage}}
    </div>`,
    styleUrl: './successMessage.component.scss',
    imports: [CommonModule]
})
export class SuccessMessage {
    @Input() successMessage = '';
}