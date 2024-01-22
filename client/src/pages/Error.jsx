import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
// import { Link } from 'react-router-dom';
import errorImg from '../assets/images/not-found.svg';
function Error() {
	const error = useRouteError();

	if (error.status === 404) {
		return (
			<Wrapper>
				<div>
					<img src={errorImg} alt='not-found' />
					<h3>Ohh! Page not found</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam modi
						quis autem harum in error voluptates perferendis possimus, eos
						exercitationem?
					</p>

					<Link to='/dashboard'>Back Home</Link>
				</div>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h3>something went wrong</h3>
		</Wrapper>
	);
}

export default Error;
