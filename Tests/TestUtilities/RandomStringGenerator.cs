using System;
using System.Linq;

namespace Tests.TestUtilities
{
    public static class RandomStringGenerator
    {
        private static readonly Random Random = new();
        
        public static string CreateRandomString(int length = 10, int start = 97, int end = 122)
        {
            return Enumerable.Range(1, length)
                .Select(x => ((char) Random.Next(start, end)).ToString())
                .Aggregate((x, y) => $"{x}{y}");
        }
    }
}