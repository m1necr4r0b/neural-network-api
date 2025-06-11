/* main file for the neural network and API */

/* importing brain.js for the neural network, express for API work and file-system for saving and reading */
const brain = require('brain.js');
const express = require('express');
const fs = require('fs')

/* initialize host app */
const app = express();
app.use(express.json());

/* reading the data from trainingData file in src */
const data = fs.readFileSync('./src/trainingData.json', 'utf-8');
const trainingData = JSON.parse(data);

/* making a new neural network and training it with the data */
const network = new brain.NeuralNetwork();
network.train(trainingData);

/* creating the first API endpoint */
app.get('/', (req, res) => {
    res.send(
        'welcome! there are 2 endpoints as of right now: /run, /save'
    )
});

/* creating the /run endpoint (with ?input query) */
app.get('/run', (req, res) => {
    // return if there is no query
    if (!req.query.input) {
        res.status(418).send('you must have query: ?input=[1,2,3,4]')
    }
    else {
        // getting the input and feeding the input to the neural network
        const input = JSON.parse(req.query.input);
        const result = network.run(input);

        // the result is a Float32array for some reason, so it must be converted to an normal array
        const resultJson = Array.from(result);
        res.send(resultJson)
    }
});

/* creating the /save endpoint (saves the neural network to savedNetwork file in src) */
app.get('/save', (req, res) => {
    // converts the entire neural network to JSON and then saves it
    const savedNetwork = network.toJSON()
    fs.writeFile('./src/savedNetwork.json', JSON.stringify(savedNetwork), 'utf-8', (err) => {
        if (err) {
            // if the file somehow fails to save
            console.error(err);
            res.status(500).send(err);
            return
        };
        // if everything goes good
        res.send('successfully saved neural network');
        return
    })
});

/* and we launch the host server */
app.listen(3030, () => console.log('were so on'))