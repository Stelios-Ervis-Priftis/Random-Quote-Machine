// Third party libraries
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

// Components
// import QuoteApp from './components/QuoteApp'
const QuoteApp = lazy(() => import('./components/QuoteApp'));

// Style
import 'normalize.css';
import './css/styles.scss';

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faSpinner);

// Render to are root div (app-root)
ReactDOM.render(
	<Suspense
		fallback={
			<div className="loader">
				<FontAwesomeIcon icon="spinner" pulse />
				<p>Loading</p>
			</div>
		}
	>
		<QuoteApp />
	</Suspense>,
	document.getElementById('app-root'),
);
