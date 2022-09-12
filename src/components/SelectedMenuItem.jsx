import React from "react";
import '../App.css';

const SelectedMenuItem = (props) => {

  const QuantityData = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
    { id: 10, value: 10 },
  ];

  // 수량 변경
  const changeQuantity = (e) => {
    let copyArray = JSON.parse(localStorage.getItem("menuList")); // 메뉴리스트를 담는 임시 배열 변수 생성
    const findIndex = copyArray.findIndex(element => element.name === props.item.name); // 배열에서 수량을 조정한 메뉴와 이름이 같은 아이템의 위치를 찾는다

    if(findIndex != -1) { // -1이 아니라는 건, 배열에서 수량을 조정한 메뉴와 이름이 같은 아이템이 있다는 뜻.
      copyArray[findIndex] = {...copyArray[findIndex], count: parseInt(e.target.value)}; //해당 배열에서 해당 위치의 아이템의 개수를 새로 정해준다
      localStorage.setItem("menuList", JSON.stringify(copyArray)); // 그리고 localStorage에 저장
      props.getMenuItem(); // 메인화면에서 리스트 다시 불러오기
    }
  }

  // 아이템 삭제 클릭 이벤트
  const onDeleteEvent = () => {
    let copyArray = JSON.parse(localStorage.getItem("menuList"));
    localStorage.setItem("menuList", JSON.stringify(copyArray.filter(item => item.name !== props.item.name)));
    props.getMenuItem(); // 리스트 다시 불러오기
  }

  return (
    <div className="itemDiv">
      <div className="textDiv">
        <p className="mainText">{props.item.name}</p>
        <p className="subText">{props.item.price}원</p>
      </div>
      
      <button className="deleteBtn" onClick={onDeleteEvent}>✖</button>
      <select className="countSelect" onChange={changeQuantity} defaultValue={props.item.count}>
        {QuantityData.map((data, idx) => {
          return (
            <option value={data.value} key={data.id}>{data.value}</option>
          )
        })}
      </select>
    </div>
  );
};
export default SelectedMenuItem