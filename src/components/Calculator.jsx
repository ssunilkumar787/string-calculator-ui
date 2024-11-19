import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState(""); // User input
  const [result, setResult] = useState(""); // Result or error message

  const add = (numbers) => {
    if (!numbers) return 0;

    let delimiter = /,|\n/; // Default delimiters: comma and newline
    let negatives = [];

    // Check if a custom delimiter is specified
    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf("\n");
      delimiter = new RegExp(numbers.substring(2, delimiterEndIndex));
      numbers = numbers.substring(delimiterEndIndex + 1); // Remove the delimiter line
    }

    const numberArray = numbers.split(delimiter);
    const sum = numberArray.reduce((acc, num) => {
      const parsedNum = parseInt(num, 10);

      if (isNaN(parsedNum)) return acc; // Ignore invalid numbers
      if (parsedNum < 0) negatives.push(parsedNum);

      return acc + parsedNum;
    }, 0);

    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return sum;
  };

  const handleCalculate = () => {
    try {
      const sum = add(input);
      setResult(`Result: ${sum}`);
    } catch (error) {
      setResult(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          String Calculator
        </h1>
        <input
          type="text"
          placeholder="Enter numbers (e.g., 1,2 or //;\n1;2)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCalculate}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Calculate
        </button>
        <div className="mt-4 text-lg font-medium text-gray-700 text-center">
          {result}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
