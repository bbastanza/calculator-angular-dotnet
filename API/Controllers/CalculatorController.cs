using System;
using Core.Assets;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public sealed class CalculatorController : Controller
    {
        private readonly ICalculator _calculator;

        public CalculatorController(ICalculator calculator)
        {
            _calculator = calculator;
        }

        [HttpGet]
        public string[] ListAvailableOperations()
        {
            return _calculator.GetAvailableOperations();
        }

        [HttpGet("{operand}/{firstNumber:int}/{secondNumber:int}")]
        public decimal PerformOperation(string operand, int? firstNumber, int? secondNumber)
        {
            if (operand == null || firstNumber == null || secondNumber == null)
                throw new InvalidOperationException("invalid input for operation");

            return _calculator.PerformOperation(operand, (int) firstNumber, (int) secondNumber);
        }
    }
}