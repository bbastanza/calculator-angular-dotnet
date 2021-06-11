import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Expression } from '../interfaces/expression';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = '/calculator';
  constructor(private httpClient: HttpClient) {}

  getOperations(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.apiUrl}/operations`,
      httpOptions
    );
  }

  performOperation(expression: Expression): Observable<number> {
    return this.httpClient.get<number>(
      `${this.apiUrl}/${expression.operand}/${expression.firstNumber}/${expression.secondNumber}`
    );
  }
}
