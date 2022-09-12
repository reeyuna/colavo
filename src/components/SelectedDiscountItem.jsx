import React from "react";
import '../App.css';

const SelectedDiscountItem = (props) => {

  // 아이템 삭제 클릭 이벤트
  const onDeleteEvent = () => {
    let copyArray = JSON.parse(localStorage.getItem("discountList"));
    localStorage.setItem("discountList", JSON.stringify(copyArray.filter(item => item.name !== props.item.name)));
    props.getDiscountItem(); // 리스트 다시 불러오기
  }
  
  return (
    <div className="itemDiv">
      <div className="textDiv">
        <p className="mainText">{props.item.name}</p>
        <p className="subText pinkText">
          {props.discount.toFixed(0)}원({(props.item.rate * 100).toFixed(0)}%)</p>
      </div>
      <button className="deleteBtn" onClick={onDeleteEvent}>✖</button>
    </div>
  );
};
export default SelectedDiscountItem