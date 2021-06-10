using System;
using System.Linq;
using NUnit.Framework;
using Core.Assets;
using Tests.TestUtilities;

namespace Tests.Core.Assets
{
    [TestFixture]
    public class CalculatorTests
    {
        private Calculator _sut;

        [SetUp]
        public void Setup()
        {
            _sut = new Calculator();
        }

        [Test]
        public void GetAvailableOperations_WhenCalled_ReturnsCorrectOperations()
        {
            var result = _sut.GetAvailableOperations();
            
            Assert.That(result.Contains("add"));
            Assert.That(result.Contains("subtract"));
            Assert.That(result.Contains("multiply"));
            Assert.That(result.Contains("divide"));
            Assert.That(result.Count, Is.EqualTo(4));
        }

        [Test]
        public void PerformOperation_InvalidOperation_ThrowsApplicationException()
        {
            var randomString = RandomStringGenerator.CreateRandomString();
            
            Assert.That(() => _sut.PerformOperation(randomString, 1, 1), Throws.Exception.TypeOf<ApplicationException>());
        }

        [Test]
        [TestCase("add", 3, 7, 10)]
        [TestCase("add", .5, 10, 10.5)]
        [TestCase("subtract", 15, 5, 10)]
        [TestCase("subtract", 15, .5, 14.5)]
        [TestCase("multiply", 4, 10, 40)]
        [TestCase("multiply", .5, 5, 2.5)]
        [TestCase("divide", 12, 4, 3)]
        [TestCase("divide", 10, .4, 25)]
        public void PerformOperation_ValidOperation_ReturnsCorrectResult(string operation, decimal firstNumber, decimal secondNumber, decimal desiredResult)
        {
            var result = _sut.PerformOperation(operation, firstNumber, secondNumber);
            
            Assert.That(result, Is.EqualTo(desiredResult));
        }
    }
}