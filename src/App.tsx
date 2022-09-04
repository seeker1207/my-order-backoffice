import React from 'react';
import './App.css';
import OrderListPage from './pages/Order/OrderListPage/OrderListPage';
import {Route, Routes} from "react-router-dom";
import OrderDetailPage from "./pages/Order/OrderDetailPage/OrderDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderListPage />} />
      <Route path="orders" element={<OrderListPage />} />
      <Route path="orders/:orderId" element={<OrderDetailPage />} />
    </Routes>
  );
}

export default App;
