import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() name: string;
  @Input() selected: boolean = false;
  @Output() onSelected: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {}

  handleClick(): void {
    this.onSelected.emit();
  }
}
