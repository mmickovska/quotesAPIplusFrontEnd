import fetch from 'node-fetch';
import mongoose from 'mongoose';
import { } from 'dotenv/config'

mongoose.connect(
    "" + process.env.DB_CONNECT,
    {},
    () => { console.log("Connected to DB"); }
)

const quotesSchema = new mongoose.Schema({
    q: {
        type: String,
        required: true
    },
    a: {
        type: String,
        required: true
    },
    c: {
        type: Number,
        required: true
    },
    h: {
        type: String,
        required: true
    }
})

const Quotes = mongoose.model('Quotes', quotesSchema);

async function getQuotes() {
    const myQuotes = await fetch('https://zenquotes.io/api/quotes');
    const res = await myQuotes.json();
    for (let i = 0; i < res.length; i++) {

        const quote = new Quotes({
            q: res[i]['q'],
            a: res[i]['a'],
            c: res[i]['c'],
            h: res[i]['h']
        });
        quote.save();
    }
}

getQuotes();

export default Quotes;