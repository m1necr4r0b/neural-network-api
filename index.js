const brain = require('brain.js');
const express = require('express');
const app = express();
app.use(express.json());

const trainingData = [
  { input: [0, 0, 0, 0], output: [1] }, // 0 (even)
  // { input: [0, 0, 0, 1], output: [0] }, // 1 (odd)
  // { input: [0, 0, 1, 0], output: [1] }, // 2 (even)
  { input: [0, 0, 1, 1], output: [0] }, // 3 (odd)
  { input: [0, 1, 0, 0], output: [1] }, // 4 (even)
  // { input: [0, 1, 0, 1], output: [0] }, // 5 (odd)
  // { input: [0, 1, 1, 0], output: [1] }, // 6 (even)
  // { input: [0, 1, 1, 1], output: [0] }, // 7 (odd)
  // { input: [1, 0, 0, 0], output: [1] }, // 8 (even)
  // { input: [1, 0, 0, 1], output: [0] }, // 9 (odd)
  { input: [1, 0, 1, 0], output: [1] }, // 10 (even)
  { input: [1, 0, 1, 1], output: [0] }, // 11 (odd)
  //{ input: [1, 1, 0, 0], output: [1] }, // 12 (even)
  //{ input: [1, 1, 0, 1], output: [0] }, // 13 (odd)
  //{ input: [1, 1, 1, 0], output: [1] }, // 14 (even)
  //{ input: [1, 1, 1, 1], output: [0] }, // 15 (odd)
];

const network = new brain.NeuralNetwork({
    hiddenLayers: [8]
});

network.train(trainingData);

function testNumber(number) {
    const binary = number.toString(2).padStart(4, '0').split('').map(Number);
    const result = network.run(binary);
    const isEven = result[0] > 0.5;
    const correctNess = isEven === (number % 2 === 0)
    console.log(`${correctNess ? '✅' : '❌'} Number: ${number} (Binary: ${binary}) - Even: ${isEven} (Accuracy: ${result[0]})`)
};

testNumber(1);
testNumber(2);
testNumber(3);
testNumber(5);
testNumber(15);
testNumber(4);
testNumber(7);
testNumber(10);
testNumber(13);