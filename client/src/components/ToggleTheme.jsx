import React from 'react'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaMoon, FaSun } from 'react-icons/fa';
function ToggleTheme() {
    const {isDark,toggleDarkTheme}  = useDashboardContext()
  return (
		<Wrapper onClick={toggleDarkTheme}>
			{
                isDark ? <FaSun /> : <FaMoon />
            }
		</Wrapper>
	);
}

export default ToggleTheme