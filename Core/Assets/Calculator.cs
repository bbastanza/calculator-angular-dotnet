using System;

namespace Core.Assets
{
    public interface ICalculator
    {
        string[] GetAvailableOperations();
        decimal PerformOperation(string operand, int firstNumber, int secondNumber);
    }

    public class Calculator : ICalculator
    {
        private readonly string[] _availableOperations = {"add", "subtract", "multiply", "divide"};

        public string[] GetAvailableOperations()
        {
            return _availableOperations;
        }

        public decimal PerformOperation(string operand, int firstNumber, int secondNumber)
        {
            return operand switch
            {
                "add" => (decimal) firstNumber + secondNumber,
                "subtract" => (decimal) firstNumber - secondNumber,
                "multiply" => (decimal) firstNumber * secondNumber,
                "divide" => (decimal) firstNumber / secondNumber,
                _ => throw new Exception("operand not valid")
            };
        }
    }
}