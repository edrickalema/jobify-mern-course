import React from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaHome } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import { Login } from '../pages';
import LogoutContainer from './LogoutContainer';
import ToggleTheme from './ToggleTheme';
function Navbar() {
	const { toggleSideBar, user } = useDashboardContext();
	return (
		<Wrapper>
			<div className='nav-center'>
				<button type='button' className='toggle-btn' onClick={toggleSideBar}>
					<FaAlignLeft />
				</button>

				<div>
					<Logo />
					<h4 className='logo-text'>dashboard</h4>
				</div>
				<div className='btn-container'>
					<ToggleTheme />
					<LogoutContainer />
				</div>
			</div>
		</Wrapper>
	);
}

export default Navbar;
