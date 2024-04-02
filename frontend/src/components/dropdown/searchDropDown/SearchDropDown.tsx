import { useState } from 'react';
import { DropdownMain, DropdownBar, DropdownMenu, DropdownMenuText } from './StyledSearchDropDown';

interface typeProp {
	setType: (value : string) => void;
}

export const SearchDropdown = ({ setType } : typeProp) => {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState("분류")
	const menu = ["꽃 이름", "꽃말", "텍스트"]
	const values = ["NAME", "MEANING", "TEXT"]

	const toggleDropdown = () => {
		setIsVisible((prev) => !prev);
	}; // 드롭다운 닫기 

	const setMenu = (index : number) => {
		setSelectedMenu(menu[index])
		setType(values[index])
		setIsVisible((prev) => !prev);
	} // 드롭다운 메뉴 선택 -> 이후 드롭다운 메뉴 닫기
	
	return (
		<>
			<DropdownMain style={{zIndex:'1'}}>
				{/* 드롭다운 상단 위치 - 누른 것으로 바뀜 */}
				<DropdownBar onClick={toggleDropdown}>{selectedMenu}
				</DropdownBar>
					{/* 드롭다운 메뉴들 */}
					<DropdownMenu $visible={isVisible}>
					{menu.map((item, idx) => {
						return <DropdownMenuText key={idx} onClick={() => setMenu(idx)}>{item}</DropdownMenuText>
					})}
					</DropdownMenu>
			</DropdownMain>
		</>
	);
};
