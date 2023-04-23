import styled from "@emotion/styled";

interface Props {
  dropName: string;
  dropMenu: string[];
  isShowDrop: boolean;
  updateDrop: Function;
}

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  max-width: 124px;
  height: 32px;
`;
const DropdownTitle = styled.p`
  color: #b0b0b0;
`;

const DropMenuList = styled.div`
  display: ${(props: { showList: Boolean }) =>
    props.showList ? "flex" : "none"};
`;
const DropMenu = styled.div`
  display: flex;
  width: 100%;
`;

const Dropdown = ({ dropMenu, dropName, isShowDrop, updateDrop }: Props) => {
  return (
    <>
      <DropdownContainer>
        <DropdownTitle onClick={() => updateDrop(!isShowDrop)}>
          {dropName}
        </DropdownTitle>
        <DropMenuList showList={isShowDrop}>
          {dropMenu.map((menu: string, index: number) => (
            <DropMenu key={index}>{menu}</DropMenu>
          ))}
        </DropMenuList>
      </DropdownContainer>
    </>
  );
};

export default Dropdown;
