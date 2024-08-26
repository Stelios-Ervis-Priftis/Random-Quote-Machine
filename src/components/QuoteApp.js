import randomColor from 'random-color';
import React, { Component } from 'react';
import 'regenerator-runtime/runtime';

export default class QuoteApp extends Component {
	state = {
		quote: [],
		color: randomColor().hexString(),
	};

	fetchQuoteApi = async () => {
		const url = 'https://api.api-ninjas.com/v1/quotes';

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'X-Api-Key': process.env.NINJA_KEY,
					contentType: 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const quote = await response.json();

			this.setState({
				quote: quote,
				color: randomColor().hexString(),
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	componentDidMount() {
		this.fetchQuoteApi();
	}

	getNewQuote = () => {
		this.fetchQuoteApi();
	};

	render() {
		const randomColor = {
			color: this.state.color,
		};

		return (
			<div className="container">
				<h1 className="title" style={randomColor}>
					Random Quote Machine
				</h1>

				{this.state.quote.map((q) => (
					<div>
						<p className="quote" style={randomColor}>
							{`"${q.quote}"`}
						</p>

						<p className="author" style={randomColor}>
							{q.author}
						</p>
					</div>
				))}

				<button
					className="btn"
					style={randomColor}
					onClick={this.getNewQuote}
				>
					New Quote
				</button>
			</div>
		);
	}
}
