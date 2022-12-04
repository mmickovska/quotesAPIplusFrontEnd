import express from 'express';
import Quotes from './db.js'

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));


api.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quotes.find({}).limit(10);
        res.json(quotes);
    } catch (err) {
        return res.status(500).send('Error');
    }
}
);

api.get('/quotes/random-quote', async (req, res) => {
    try {
        const quotesCount = await Quotes.count();
        let random = Math.floor(Math.random() * quotesCount);
        const quote = await Quotes.findOne().skip(random);
        res.json(quote);
    } catch (err) {
        return res.status(500).send('Error');
    }
});


api.listen(process.env.PORT, err => {
    if (err) {
        return console.log('Could not start service');
    }
    console.log(`Service started successfully on ${process.env.PORT}`);
});

