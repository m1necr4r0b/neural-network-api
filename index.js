const brain = require('brain.js');
const express = require('express');
const app = express();
app.use(express.json());

const trainingData = [
  { input: [0, 0, 0, 0], output: [1] }, // 0 (even)
  { input: [0, 0, 0, 1], output: [0] }, // 1 (odd)
  { input: [0, 0, 1, 0], output: [1] }, // 2 (even)
  { input: [0, 0, 1, 1], output: [0] }, // 3 (odd)
  { input: [0, 1, 0, 0], output: [1] }, // 4 (even)
  { input: [0, 1, 0, 1], output: [0] }, // 5 (odd)
  { input: [0, 1, 1, 0], output: [1] }, // 6 (even)
  { input: [0, 1, 1, 1], output: [0] }, // 7 (odd)
  { input: [1, 0, 0, 0], output: [1] }, // 8 (even)
  { input: [1, 0, 0, 1], output: [0] }, // 9 (odd)
  { input: [1, 0, 1, 0], output: [1] }, // 10 (even)
  { input: [1, 0, 1, 1], output: [0] }, // 11 (odd)
  { input: [1, 1, 0, 0], output: [1] }, // 12 (even)
  { input: [1, 1, 0, 1], output: [0] }, // 13 (odd)
  { input: [1, 1, 1, 0], output: [1] }, // 14 (even)
  { input: [1, 1, 1, 1], output: [0] }, // 15 (odd)
];

const network = new brain.NeuralNetwork({
    hiddenLayers: [8]
});

network.train(trainingData);

function testNumber(number) {
    const binary = number.toString(2).padStart(4, '0').split('').map(Number);
    const result = network.run(binary);
    const isEven = result[0] > 0.5;
    return [binary, isEven, result[0]]
};

app.get('/', (req, res) => {
    let result = [];
    for (let i = 0; i < 15; i++) {
        let out = testNumber(i);
        result[i+1] = {
            binary: out[0],
            isEven: out[1],
            accuracy: out[2]
        }
    };
    res.send(result)
});

app.listen(3030, () => console.log('were so on'))