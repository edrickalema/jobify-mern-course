import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';

function SmallSideBar() {
	const { sidebar,isDarkTheme, toggleSideBar, user } = useDashboardContext();

	return (
		<Wrapper>
			<div
				className={
					isDarkTheme ? 'sidebar-container show-sidebar' : 'sidebar-container'
				}
			>
				<div className='content'>
					<button type='button' className='close-btn' onClick={toggleSideBar}>
						<FaTimes />
					</button>

					<header>
						<Logo />
					</header>

					<div className='nav-links'>
					 <NavLinks />
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default SmallSideBar;
