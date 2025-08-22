import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  FloatLabelType,
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'normax-input',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './normax-input.html',
  styleUrl: './normax-input.scss',
  standalone: true
})
export class NormaxInput implements ControlValueAccessor {
  @Input()
  label!: string;

  @Input()
  type!: string;

  @Input()
  placeholder!: string;

  @Input()
  appearance: MatFormFieldAppearance = 'outline';

  @Input()
  floatLabel!: FloatLabelType;

  input: any;

  constructor() {}

  writeValue(obj: any): void {
    this.input = obj;
  }
  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {}
}
