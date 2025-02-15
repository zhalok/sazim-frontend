import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginLayout from "./pages/auth/layout";
import Login from "./pages/auth/login";
import Order from "./pages/order";
import Orders from "./pages/orders";
import { AllProducts } from "./pages/products";
import SellerLayout from "./pages/seller/layout";
import SellerOrders from "./pages/seller/orders";
import { SellerProducts } from "./pages/seller/products";

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-y-4">
        <Router>
          <Routes>
            <Route path="/auth" element={<LoginLayout />}>
              <Route path="/auth/login" element={<Login />} />
            </Route>
            <Route path="/seller" element={<SellerLayout />}>
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
            </Route>
            <Route index element={<AllProducts />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
}

export default App;
