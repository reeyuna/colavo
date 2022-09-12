import React from "react";
import dayjs from 'dayjs';

const Header = () => {
    return (
        <header className="headerDiv"
          style={{
              marginTop: "20px",
              marginBottom: "20px"
          }}>
          <p className="headerP" 
            style={{
                fontWeight: "bold",
                fontSize: "16px",
              }}>곽지우</p>
          <p className="headerP" 
            style={{
                color: "#C2D0DB",
                fontSize : "14px"
            }}>{dayjs(new Date()).format('YYYY.MM.DD. a hh:mm')}</p>
        </header>
    );
};
export default Header