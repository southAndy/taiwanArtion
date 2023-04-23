import styled from "@emotion/styled";

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 100px;
  height: 100px;
  max-width: 124px;
  box-shadow: 1px 0px 0px #dadada;
  height: 32px;
  cursor: pointer;
`;
const DropdownTitle = styled.p`
  color: #b0b0b0;
`;

const DropMenuList = styled.div`
  display: ${(props: { showList: Boolean }) =>
    props.showList ? "block" : "none"};
  width: 128px;
  max-height: 232px;
  position: absolute;
  z-index: 2;
  left: 0%;
  top: 125%;
  background: #ffffff;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;
const DropMenu = styled.div`
  font-size: 14px;
  text-align: center;
  &:hover {
    color: #be875c;
  }
`;

type Props = {
  dropName: string;
  dropMenu: string[];
  isShowDrop: boolean;
  updateDrop: Function;
  selectedOption: Function;
  keyword: string;
};

const Dropdown = ({
  dropMenu,
  dropName,
  isShowDrop,
  updateDrop,
  selectedOption,
  keyword,
}: Props) => {
  return (
    <>
      <DropdownContainer>
        <DropdownTitle onClick={() => updateDrop(!isShowDrop)}>
          {keyword ? keyword : dropName}
        </DropdownTitle>
        <DropMenuList showList={isShowDrop}>
          {dropMenu?.map((menu: string, index: number) => (
            <DropMenu
              onClick={() =>
                selectedOption((payload: string) => {
                  payload = menu;
                  //開關下拉
                  updateDrop(false);
                  return payload;
                })
              }
              key={index}
            >
              {menu}
            </DropMenu>
          ))}
        </DropMenuList>
      </DropdownContainer>
    </>
  );
};

export default Dropdown;
