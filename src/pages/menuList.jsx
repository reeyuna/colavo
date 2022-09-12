import {React, useEffect, useState} from "react";
import MenuItem from "../components/MenuItem";
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
  let navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  
  // 화면 진입 시 실행
  useEffect(() => {
    getList();
  }, [])

  //메뉴 리스트 가져오기
  const getList = () => {
     fetch('https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData', {
       method: 'GET',
     })                      
       .then(res => res.json())
       .then(res => {
        console.log(res.items);
        if (res.items !== null) {
          const temp = [];
          temp.push(res.items.i_1);
          temp.push(res.items.i_2);
          temp.push(res.items.i_3);
          temp.push(res.items.i_4);
          temp.push(res.items.i_5);
          temp.push(res.items.i_6);
          temp.push(res.items.i_7);
          temp.push(res.items.i_8);
          temp.push(res.items.i_9);
          temp.push(res.items.i_10);
          temp.push(res.items.i_11);
          temp.push(res.items.i_12);
          temp.push(res.items.i_13);
          temp.push(res.items.i_14);
          temp.push(res.items.i_15);
          temp.push(res.items.i_16);
          setItemList(temp);
        }
       });
   }
 
   // 선택한 메뉴를 변수에 담아주기
   const addSetSelectItem = (item) => {
     setSelectItem([...selectItem, item]);
   }
  
   // 확인 버튼 이벤트
   const selectItemSubmit = () => {
     let oldList = JSON.parse(localStorage.getItem("menuList")); // 기존 저장된 리스트
     let tempList = selectItem; // 새로 선택한 리스트
 
     if (oldList !== null) { // 기존에 저장된 리스트가 있다면
       for (let i = 0; i < oldList.length ; i++ ) { // 기존에 저장된 리스트에 대한 for문
         if (tempList.findIndex(element => element.name === oldList[i].name) === -1) { // 만약 기존에 저장된 리스트에 새로 선택한 리스트의 아이템과 겹치는게 없다면
           tempList.push(oldList[i]) // 새로 선택한 리스트 + 기존에 저장된 리스트
         }
       }
     }
     localStorage.setItem("menuList", JSON.stringify(tempList));
     navigate("/")
   }
   
    return (
      <div>
        <h3 style={{
          margin : "10px",
          padding : "10px"
        }}>시술 메뉴</h3>
        <div>
          {itemList.length !== 0 && itemList.map((item, idx) => {
            return (
              <MenuItem item={item} key={idx} addSetSelectItem={addSetSelectItem} selectItem={selectItem}/>
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
            }}>💜 서비스를 선택하세요(여러 개 사용가능)</p>
          <button className='fullBtn' onClick={selectItemSubmit}>완료</button>
        </div>
      </div>
    );
  }
  
  export default MenuList;