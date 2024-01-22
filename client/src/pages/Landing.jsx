import React from 'react';
// import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import {Logo} from '../components'
import { Link } from 'react-router-dom';
function Landing() {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>

			<div className='container page'>
				<div className='info'>
					<h1>
						Job <span>Tracking</span> app
					</h1>

					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nulla
						dolorum incidunt aliquid non sapiente autem ad, cumque vitae
						repudiandae?
					</p>

					<Link to='/register' className='btn register-link'>
						Register
					</Link>
					<Link to='/login' className='btn'>Login/Demo user</Link>
				</div>
        <img src={main} className='main-img img' alt='jobify' />
			</div>
		</Wrapper>
	);
}

export default Landing;
