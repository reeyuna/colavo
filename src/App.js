import { React, useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import SelectedMenuItem from './components/SelectedMenuItem'
import SelecteDiscountItem from './components/SelectedDiscountItem'

function App() {
  let navigate = useNavigate();
  
  const [menuList, setMenuList] = useState([]);
  const [discountList, setDiscountList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [currencyCode, setCurrencyCode] = useState('KRW');
  
  // 화면 처음 불러올때 실행해주는 함수
  useEffect(() => {
    getCode();
    getMenuItem();
    getDiscountItem();
  }, [])

  // menuList & discountList 값이 변경 될 때마다 금액 재계산
  useEffect(() => {
    getTotalAmount();
    getTotalDiscount();
  }, JSON.parse(localStorage.getItem("menuList")))
  useEffect(() => {
    getTotalAmount();
    getTotalDiscount();
  }, JSON.parse(localStorage.getItem("discountList")))


  // currency_code 에 따른 금액 표시
  const getCode = () => {
    fetch('https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData', {
      method: 'GET',
    })                      
      .then(res => res.json())
      .then(res => {
        setCurrencyCode(res.currency_code);
      });
  }

  //총 가격
  const getTotalAmount = () => {
    if (menuList == null) {
      return false; // 빈 배열일때 return false 로 함수 중단
    }

    let tempTotalAmount = 0;  // 임시 총 가격

    for (let i = 0; i < menuList.length; i++) {
      tempTotalAmount += menuList[i].price * menuList[i].count
    }
    setTotalAmount(tempTotalAmount);
  }

  //총 할인
  const getTotalDiscount = () => {
    if (menuList == null || discountList == null) {
      return false; // 빈 배열일때 return false 로 함수 중단
    }

    let tempTotalDiscount = 0; // 임시 총 할인

    for (let i = 0; i < menuList.length; i++) {
      for (let j = 0 ; j < discountList.length; j++) {
        tempTotalDiscount += menuList[i].price * menuList[i].count * discountList[j].rate;
      }
    }
    setTotalDiscount(tempTotalDiscount);
  }

  // 저장한 메뉴 가져오기
  const getMenuItem = () => {
    setMenuList(JSON.parse(localStorage.getItem("menuList")));
  }

  // 저장한 할인 가져오기
  const getDiscountItem = () => {
    setDiscountList(JSON.parse(localStorage.getItem("discountList")));
  }

  return (
    <div>
      <Header />
      <div className=''>
        <button onClick={()=> {
          navigate('menuList')
        }}
          style={{
            color: "#909EA7",
            backgroundColor: "#F7F7F7",
            border : "none",
            padding : "10px",
            marginBottom : "10px",
            marginLeft : "10px",
            marginRight : "5px",
            borderRadius : "10px"
            
          }}>✂ 시술</button>
        <button onClick={()=> {
          navigate('discountList')
        }}
          style={{
            color: "#FF75AA",
            backgroundColor: "#FDF1F5",
            border : "none",
            padding : "10px",
            marginBottom : "10px",
            borderRadius : "10px" 
          }}>💸 할인</button>
      </div>
      
      {/* 선택한 상품 리스트 */}
      <div>
        { menuList && menuList.map((menu, idx) => {
          return (
            <SelectedMenuItem item={menu} key={idx} getMenuItem={getMenuItem}/>
          )
        })}
      </div>

      {/* 할인 리스트 */}
      <div>
        { discountList && discountList.map((menu, idx) => {
          return (
            <SelecteDiscountItem item={menu} key={idx} discount={-totalAmount * menu.rate} getDiscountItem={getDiscountItem} />
          )
        })}
      </div>

      {/* 합계, 버튼 포함한 하단 */}
      <div className="totalBottom">
        <div>
          <a style={{
              color : "#909EA7",
              fontSize : "13px",
              fontWeight : "bold"
          }}>합계</a>
          <a style={{
              fontWeight : "bold"
          }}className='totalAmount'>
            {currencyCode === 'KRW' ? 
            (totalAmount - totalDiscount) + "원" 
            : "$" + ((totalAmount - totalDiscount) / 1380) }
          </a>
        </div>
        <button className='fullBtn'>다음</button>
      </div>
    </div>
  );
}

export default App;
