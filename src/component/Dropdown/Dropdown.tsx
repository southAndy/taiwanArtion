import "./Dropdown.scss";

interface Props {
  dropName: String;
  dropMenu: Array; //todo 如果列表資料長度不一，ts怎定義
  isShowDrop: Boolean;
  updateDrop: Function;
}

const Dropdown = ({ dropMenu, dropName, isShowDrop, updateDrop }: Props) => {
  return (
    <>
      <div className="dropdown">
        <div className="dropdown-title">{dropName}</div>
        <div className={isShowDrop ? "drop-menu" : "invisible"}>
          {dropMenu.map((menu: String, index: Number) => {
            return (
              <div className="dropdown-menu" key={index}>
                {menu}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
