using System;

namespace Core.Assets
{
    public interface ICalculator
    {
        string[] GetAvailableOperations();
        decimal PerformOperation(string operand, decimal firstNumber, decimal secondNumber);
    }

    public class Calculator : ICalculator
    {
        private readonly string[] _availableOperations = {"add", "subtract", "multiply", "divide"};

        public string[] GetAvailableOperations()
        {
            return _availableOperations;
        }

        public decimal PerformOperation(string operand, decimal firstNumber, decimal secondNumber)
        {
            return operand switch
            {
                "add" =>  firstNumber + secondNumber,
                "subtract" =>  firstNumber - secondNumber,
                "multiply" =>  firstNumber * secondNumber,
                "divide" =>  firstNumber / secondNumber,
                _ => throw new ApplicationException("operand not valid")
            };
        }
    }
}