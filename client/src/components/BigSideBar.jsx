import React from 'react';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';
function BigSideBar() {
	const { isDarkTheme } = useDashboardContext();

	return (
		<Wrapper>
			<div
				className={
					isDarkTheme ? 'sidebar-container show-sidebar' : 'sidebar-container show-sidebar'
				}
			>
				<div className='content'>
					<header>
						<Logo />
					</header>
          <NavLinks />
				</div>
			</div>
		</Wrapper>
	);
}

export default BigSideBar;
