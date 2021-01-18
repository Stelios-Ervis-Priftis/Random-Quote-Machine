import React, { Component } from 'react'
import randomColor from 'random-color'
import TypeIt from 'typeit-react'

export default class QuoteApp extends Component {
	state = {
		quote: [],
		color: null,
	}
	fetchQuoteApi = () => {
		fetch('https://type.fit/api/quotes')
			.then((res) => res.json())
			.then((result) => {
				const randomNum = Math.floor(Math.random() * result.length)
				const quote = result[randomNum]
				this.setState({
					quote: quote,
					color: randomColor().hexString(),
				})
			})
	}
	componentDidMount() {
		this.fetchQuoteApi()
	}
	getNewQuote = () => {
		this.fetchQuoteApi()
	}
	render() {
		const randomColor = {
			color: this.state.color,
		}
		console.log(this.state.quote)
		console.log(this.state.color)
		return (
			<div className='container'>
				<h1 className='title' style={randomColor}>
					Random Quote Machine
				</h1>

				{this.state.quote.text ? (
					<p className='quote' style={randomColor}>
						{`"${this.state.quote.text}"`}
					</p>
				) : (
					// <TypeIt
					// 	options={{
					// 		strings: this.state.quote.text,
					// 		speed: 10,
					// 		waitUntilVisible: true,
					// 	}}
					// />
					<p className='quote' style={randomColor}>
						Unknown Text
					</p>
				)}

				{this.state.quote.author ? (
					<p className='author' style={randomColor}>
						{this.state.quote.author}
					</p>
				) : (
					<p style={randomColor}>Unknown Author</p>
				)}
				<button
					className='btn'
					// style={{ color: `${randomColor}` }}
					style={randomColor}
					onClick={this.getNewQuote}
				>
					New Quote
				</button>
			</div>
		)
	}
}
