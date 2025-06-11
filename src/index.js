/* main file for the neural network */

const brain = require('brain.js');
const express = require('express');
const fs = require('fs')
const app = express();
const host = require('./host')
app.use(express.json());

const data = fs.readFileSync('./src/trainingData.json', 'utf-8');
const trainingData = JSON.parse(data);

const network = new brain.NeuralNetwork();
network.train(trainingData);

host(network);