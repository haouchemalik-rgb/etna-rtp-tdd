const express = require('express');
const { add, subtract, multiply, divide } = require('./calculator');

const app = express();
const port = process.env.PORT || 5000;
app.get('/add/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Invalid input, please provide two numbers.' });
    }
    res.json({ result: add(a, b) });
});

app.get('/subtract/:a/:b', (req, res) => { 
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Invalid input, please provide two numbers.' });
    }
    res.json({ result: subtract(a, b) });
});

app.get('/multiply/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Invalid input, please provide two numbers.' });
    }
    res.json({ result: multiply(a, b) });
});

app.get('/divide/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Invalid input, please provide two numbers.' });
    }
    try {
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        res.json({ result: divide(a, b) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Démarre l'application sur le port spécifié
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;

