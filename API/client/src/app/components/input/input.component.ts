import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Expression } from '../../interfaces/Expression';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  handleSubmit() {
    if (this.currentOperand === 'divide' && this.secondNumber === 0)
      return alert('Cannot divide by 0!');

    const expression: Expression = {
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      operand: this.currentOperand,
    };

    this.apiService.performOperation(expression).subscribe((result) => {
      this.firstNumber = parseFloat(
        result.toLocaleString('en-US', {
          maximumFractionDigits: 5,
        })
      );
      this.secondNumber = 0;
      this.canSubmit = false;
      this.currentOperand = '';
    });
  }

  getOperations() {
    this.apiService
      .getOperations()
      .subscribe((list) =>
        list.forEach((operand) => this.operands.push(operand))
      );
    this.canGetOperations = false;
  }

  selectOperation(operand: string) {
    this.currentOperand = operand;
    this.canSubmit = true;
  }
}
