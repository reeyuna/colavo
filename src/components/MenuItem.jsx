import React from "react";
import '../App.css';

const MenuItem = (props) => {
  const setSelectItem = ({target}) => {
    if (target.checked) { //체크박스 선택 시
      props.addSetSelectItem(props.item); // select Item에 담기
    } else { // 선택 해제 시
      props.selectItem.splice(props.selectItem.indexOf(props.item), 1) // checkbox == false, 해당 아이템 삭제
    }
  }

  return (
    <div className="itemDiv">
      <div className="textDiv">
        <p className="mainText">{props.item.name}</p>
        <p className="subText">{props.item.price}</p>
      </div>
      <input type="checkbox" value={props.item.name} onChange={(e) => setSelectItem(e)} />
    </div>
  );
};
export default MenuItem