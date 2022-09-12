import {React, useEffect, useState} from "react";
import DiscountItem from "../components/DiscountItem";
import { useNavigate } from 'react-router-dom';

const DiscountList = () => {
  let navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  
  // 화면 진입 시 실행
  useEffect(() => {
    getDiscountList();
  }, [])

  const getDiscountList = () => {
    fetch('https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData', {
      method: 'GET',
    })                      
      .then(res => res.json())
      .then(res => {
       console.log(res.discounts);
       if (res.discounts !== null) {
         const temp = [];
         temp.push(res.discounts.d_1);
         temp.push(res.discounts.d_2);
         temp.push(res.discounts.d_3);
         temp.push(res.discounts.d_4);
         setItemList(temp);
       }
      });
  }

  // 아이템을 선택할때마다 변수에 담기
  const addSetDiscountItem = (item) => {
    setSelectItem([...selectItem, item]);
  }

  // 확인 버튼 이벤트
  const selectItemSubmit = () => {
    let oldList = JSON.parse(localStorage.getItem("discountList")); // 기존 저장된 리스트
    let tempList = selectItem; // 새로 선택한 리스트

    if (oldList !== null) { // 기존에 저장된 리스트가 있다면
      for (let i = 0; i < oldList.length ; i++ ) { // 기존에 저장된 리스트에 대한 for문
        if (tempList.findIndex(element => element.name === oldList[i].name) === -1) { // 만약 기존에 저장된 리스트에 새로 선택한 리스트의 아이템과 겹치는게 없다면
          tempList.push(oldList[i]) // 새로 선택한 리스트 + 기존에 저장된 리스트
        }
      }
    }
    localStorage.setItem("discountList", JSON.stringify(tempList));
    navigate("/")
  }
   
    return (
      <div>
        <h3 style={{
          margin : "10px",
          padding : "10px"
        }}>할인</h3>
        <div>
          {itemList.length !== 0 && itemList.map((item, idx) => {
            return (
              <DiscountItem item={item} key={idx} addSetDiscountItem={addSetDiscountItem} selectItem={selectItem}/>
            );
          })}
        </div>
        <div>
          <p
            style={{
              color : "#909EA7",
              fontSize : "13px",
              fontWeight :"bold",
              margin : "15px"
            }}>💛 할인을 선택하세요(여러 개 사용가능)</p>
          <button className='fullBtn' onClick={selectItemSubmit}>완료</button>
        </div>
      </div>
    );
  }
  
  export default DiscountList;