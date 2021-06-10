import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Expression } from '../../interfaces/expression';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  firstNumber: number = 0;
  secondNumber: number = 0;
  currentOperand: string = '';
  operands: string[] = [];
  canSubmit: boolean = false;
  canGetOperations: boolean = true;
  result: number = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  validateInput(): boolean {
    const firstNumberString = this.firstNumber?.toString();
    const secondNumberString = this.secondNumber?.toString();
    return (
      firstNumberString?.lastIndexOf('-') <= 0 &&
      secondNumberString?.lastIndexOf('-') <= 0
    );
  }

  handleSubmit(): void {
    const valid = this.validateInput();
    if (!valid) return alert('These are not the inputs you are looking for!');
    if (this.currentOperand === 'divide' && this.secondNumber === 0)
      return alert('Cannot divide by 0!');

    const expression: Expression = {
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      operand: this.currentOperand,
    };

    this.apiService.performOperation(expression).subscribe((result) => {
      this.firstNumber = this.result = Math.round(result * 1000000) / 1000000;
      this.secondNumber = 0;
      this.canSubmit = false;
      this.currentOperand = '';
    });
  }

  getOperations(): void {
    this.apiService
      .getOperations()
      .subscribe((list) =>
        list.forEach((operand) => this.operands.push(operand))
      );
    this.canGetOperations = false;
  }

  selectOperation(operand: string): void {
    this.currentOperand = operand;
    this.canSubmit = true;
  }
}
