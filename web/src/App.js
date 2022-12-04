import React from 'react';
import axios from 'axios';


class App extends React.Component {
	state = {
		q: '',
		a: '',
		c: '',
		h: '',
		quotes: [],
		randomQuote: {}
	}

	componentDidMount() {
		this.getQuotes();
	};

	getQuotes = () => {
		axios.get('/quotes')
			.then((res) => {
				const data = res.data;
				this.setState({ quotes: data });
			})
			.catch((err) => console.log(err))
	}

	displayQuotes(quotes) {

		if (!quotes.length) return null;

		return quotes.map((quote, index) => (
			<tr key={index} className="quotes_display">
				<td>{quote._id}</td>
				<td>{quote.q}</td>
				<td>{quote.a}</td>
			</tr>
		));
	};

	getRandomQuote = () => {
		axios.get('/quotes/random-quote')
			.then((res) => {
				this.setState({ randomQuote: res.data })
			})
			.catch((err) => console.log(err))
	}

	renderRandomQuote() {
		const { randomQuote } = this.state
		if (randomQuote) {
			return (
				<table id="random-quote">
					<tbody>
						<tr>
							<td>{randomQuote.q}</td>
							<td>{randomQuote.a}</td>
						</tr></tbody>
				</table>
			)
		}
		return null
	}

	render() {
		console.log('State: ', this.state);
		return (
			<div>
				<table>
					<tbody>
						{this.displayQuotes(this.state.quotes)}
					</tbody>
				</table>
				<br />
				<h1>Random Quote</h1>
				<button onClick={this.getRandomQuote}>Random Quote</button>
				{this.renderRandomQuote()}
			</div>
		)
	}
};


export default App;