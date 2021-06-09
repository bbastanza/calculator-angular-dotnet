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

        [HttpGet("operations")]
        public string[] ListAvailableOperations()
        {
            return _calculator.GetAvailableOperations();
        }

        [HttpGet("{operand}/{firstNumber:decimal}/{secondNumber:decimal}")]
        public decimal PerformOperation(string operand, decimal? firstNumber, decimal? secondNumber)
        {
            if (operand == null || firstNumber == null || secondNumber == null)
                throw new InvalidOperationException("invalid input for operation");

            return _calculator.PerformOperation(operand, (decimal) firstNumber, (decimal) secondNumber);
        }
    }
}