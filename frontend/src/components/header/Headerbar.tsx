import { StyledHeader, StyledMargin } from './StyledHeaderbar';
import { HeaderDropdown } from '../dropdown/headerDropDown/HeaderDropDown';
import { Avatar } from '../avatar/Avatar';
interface MenuProps {
	link?: string;
}

export const Header = ({link}: MenuProps) => {
	return (
		<>
			<StyledHeader>
				<StyledMargin>
					<HeaderDropdown></HeaderDropdown>
				</StyledMargin>
			</StyledHeader>
		</>
	);
};
