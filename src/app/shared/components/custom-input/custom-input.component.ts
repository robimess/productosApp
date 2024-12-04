import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit{

  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() autocomplete: string = 'off';
  @Input() icon: string = '';
  @Input() formControl!: FormControl;

  isPassword!: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (this.type == 'password') this.isPassword=true;
  }

  showOrHidePassword() {
    this.hide = !this.hide;
    if (this.hide) this.type='password';
    else this.type = 'text'
  }

}