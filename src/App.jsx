import randomColor from 'randomcolor';
import { useState } from 'react';
import './App.scss';

function App() {
	const [quote, setQuote] = useState({
		quote: 'Maybe we can show government how to operate better as a result of better architecture. Eventually, I think Chicago will be the most beautiful great city left in the world.',
		author: 'Frank Lloyd Wright',
		category: 'architecture',
	});
	const [color, setColor] = useState(randomColor());

	const fetchQuoteApi = async () => {
		const url = ' https://zenquotes.io/api/random';

		setColor(randomColor());

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					contentType: 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const quote = await response.json();
			setQuote(quote);
		} catch (error) {
			console.error(error.message);
		}
	};

	const getNewQuote = () => {
		fetchQuoteApi();
	};

	return (
		<div className="container">
			<h1 className="title" style={{ color: color }}>
				Random Quote Machine
			</h1>
			<div key={quote.author}>
				<p className="quote" style={{ color: color }}>
					{`"${quote.quote}"`}
				</p>

				<p className="author" style={{ color: color }}>
					{quote.author}
				</p>
			</div>

			<button
				className="btn"
				style={{ color: color }}
				onClick={() => getNewQuote()}
			>
				New Quote
			</button>
		</div>
	);
}

export default App;
