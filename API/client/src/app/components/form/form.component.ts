import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Expression } from '../../interfaces/expression';

@Component({
  selector: 'app-input',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  firstNumber: number = 0;
  secondNumber: number = 0;
  result: number = null;

  currentOperand: string = '';
  operands: string[] = [];

  canSubmit: boolean = false;
  hasRecievedOperations: boolean = false;
  errorText: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  getOperations(): void {
    this.apiService.getOperations().subscribe(
      (operations) =>
        operations.forEach((operand) => this.operands.push(operand)),
      () => this.apiError()
    );

    this.hasRecievedOperations = true;
  }

  handleSubmit(): void {
    const expression: Expression = {
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      operand: this.currentOperand,
    };

    this.apiService.performOperation(expression).subscribe(
      (result: number) => {
        this.result = Math.round(result * 1000000) / 1000000; // to keep decimals in check :)
        this.firstNumber = 0;
        this.secondNumber = 0;
        this.canSubmit = false;
        this.currentOperand = '';
      },
      () => this.apiError()
    );
  }

  selectOperation(operand: string): void {
    this.currentOperand = operand;
    if (!this.isDividingByZero()) return;

    this.errorText = '';
    this.canSubmit = this.hasRecievedOperations;
  }

  validateInput(input: number): boolean {
    if (this.numberOutOfRange(input)) return false;
    if (!this.checkForInvalidCharacter()) return false;
    if (!this.isDividingByZero()) return false;

    this.errorText = '';
    this.canSubmit = this.hasRecievedOperations;
    return true;
  }

  numberOutOfRange(input: number): boolean {
    if (input > 9999999 || input < -9999999) {
      const tooBig = input > 9999999;
      this.errorText = `that number is too ${tooBig ? 'big' : 'small'}!`;
      this.canSubmit = false;
      return true;
    }
    return false;
  }

  isDividingByZero(): boolean {
    if (this.secondNumber === 0 && this.currentOperand === 'divide') {
      this.errorText = 'cannot divide by 0';
      this.canSubmit = false;
      return false;
    }
    return true;
  }

  checkForInvalidCharacter(): boolean {
    const firstNumber: string = this.firstNumber?.toString();
    const secondNumber: string = this.secondNumber?.toString();

    const valid =
      firstNumber?.lastIndexOf('-') <= 0 && secondNumber?.lastIndexOf('-') <= 0;
    if (!valid) {
      this.errorText = 'These are not the inputs you are looking for!';
      this.canSubmit = false;
      return false;
    }
    return true;
  }

  apiError(): void {
    this.errorText = 'Oops! Something went wrong :(';
  }
}
