import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Expression } from '../../interfaces/expression';
import { SubscriptionContainer } from '../../helpers/subscriptionContainer';

@Component({
  selector: 'app-input',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  subscriptions = new SubscriptionContainer();

  firstNumber: number = 0;
  secondNumber: number = 0;
  result: number = null;

  operands: string[] = [];
  currentOperand: string = '';

  canSubmit: boolean = false;
  hasRecievedOperations: boolean = false;
  errorText: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubsribe();
  }

  getOperations(): void {
    this.subscriptions.add = this.apiService.getOperations().subscribe(
      (operations: string[]) => {
        operations.forEach((operand) => this.operands.push(operand));
        this.hasRecievedOperations = true;
      },
      (err: Error) => this.handleApiError(err)
    );
  }

  handleSubmit(): void {
    const expression: Expression = {
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      operand: this.currentOperand,
    };

    this.subscriptions.add = this.apiService
      .performOperation(expression)
      .subscribe(
        (result: number) => {
          this.result = Math.round(result * 1000000) / 1000000; // to keep decimals in check :)
          this.firstNumber = 0;
          this.secondNumber = 0;
          this.canSubmit = false;
          this.currentOperand = '';
        },
        (err: Error) => this.handleApiError(err)
      );
  }

  selectOperation(operand: string): void {
    this.currentOperand = operand;
    if (this.isDividingByZero()) return;

    this.canSubmit =
      this.validateInput(this.firstNumber) &&
      this.validateInput(this.secondNumber);
  }

  validateInput(input: number): boolean {
    if (this.numberOutOfRange(input)) return false;
    if (this.hasInvalidNegative()) return false;
    if (this.isDividingByZero()) return false;

    this.errorText = '';
    this.canSubmit = this.currentOperand !== '';
    return true;
  }

  numberOutOfRange(input: number): boolean {
    if (input > 9999999 || input < -9999999) {
      const tooBig: boolean = input > 9999999;
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
      return true;
    }
    return false;
  }

  hasInvalidNegative(): boolean {
    const firstNumber: string = this.firstNumber?.toString();
    const secondNumber: string = this.secondNumber?.toString();

    const validNegativePlacement: boolean =
      firstNumber?.lastIndexOf('-') <= 0 && secondNumber?.lastIndexOf('-') <= 0;
    if (!validNegativePlacement) {
      this.errorText = 'These are not the inputs you are looking for!';
      this.canSubmit = false;
      return true;
    }
    return false;
  }

  handleApiError(err: Error): void {
    this.errorText = 'Oops! Something went wrong :(';
    console.log(err);
  }
}
