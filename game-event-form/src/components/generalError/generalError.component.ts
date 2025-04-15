import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'general-error',
    templateUrl: './generalError.component.html',
    styleUrl: './generalError.component.scss',
    imports: [MatFormFieldModule, CommonModule]
})
export class GeneralError {
    @Input() error = '';
}