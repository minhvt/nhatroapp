import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import DanhSachPhong from './components/DanhSachPhong';
import DanhSachHoaDon from './components/DanhSachHoaDon';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        Ứng dụng quản lý nhà trọ - &copy; Trandu 2023
      </header>
      <div className="box-container">        
        <Link to="/">Trang Chủ</Link>
        <Link to="/phong-ds">Phòng</Link>
        <Link to="/hoadon-ds">Hóa Đơn</Link>
      </div>

      <div className="box-container">
        <Routes>
          <Route path='/' Component={Login}></Route>
          <Route path='/phong-ds' Component={DanhSachPhong}></Route>
          <Route path='/hoadon-ds' Component={DanhSachHoaDon}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
