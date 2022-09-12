import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {MenuList, DiscountList} from "../pages";
import App from "../App";

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/menuList" element={<MenuList />} />
          <Route path="/discountList" element={<DiscountList />} />
        </Routes>
      </BrowserRouter>
    )
}

export default Router;