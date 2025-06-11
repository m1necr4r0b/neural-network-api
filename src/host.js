const express = require('express');
const app = express();
app.use(express.json());

const host = (network) => {
    app.get('/', (req, res) => {
        res.send(
            'welcome! there are 2 endpoints as of right now: /run, /save'
        )
    }); 
    
    app.get('/run', (req, res) => {
        // if no query is sent
        if (!req.query.input) {
            res.status(418).send('you must have query: ?input=[1,2,3,4]')
        }
        else {
            // gets the input and then runs the network
            const input = JSON.parse(req.query.input);
            const result = network.run(input);
            // the result is a Float32array for some reason, so it must be converted to an normal array
            const resultJson = Array.from(result);
            res.send(resultJson)
        }
    });
    
    app.get('/save', (req, res) => {
        // converts the entire neural network to JSON and then saves it
        const savedNetwork = network.toJSON()
        fs.writeFile('./src/savedNetwork.json', JSON.stringify(savedNetwork), 'utf-8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return
            };
            res.send('successfully saved neural network');
            return
        })
    });
    
    app.listen(3030, () => console.log('were so on'))
}


module.exports = {

}