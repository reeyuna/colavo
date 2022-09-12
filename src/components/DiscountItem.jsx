import React from "react";
import '../App.css';

const DiscountItem = (props) => {
  const setSelectItem = ({target}) => {
    if (target.checked) { //체크박스 선택 시
      props.addSetDiscountItem(props.item); // discountItem에 담기
    } else { // 체크박스 해제 시
      props.selectItem.splice(props.selectItem.indexOf(props.item), 1) // checkbox == false, 해당 아이템 삭제
    }
  }
  
  return (
    <div className="itemDiv">
      <div className="textDiv">
        <p className="mainText">{props.item.name}</p>
        <p className="subText pinkText">{(props.item.rate * 100).toFixed(1)}%</p>
      </div>
      <input type="checkbox" value={props.item.name} onChange={(e) => setSelectItem(e)} />
    </div>
  );
};
export default DiscountItem