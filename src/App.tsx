import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import LoginLayout from "./pages/auth/layout";
import SellerLayout from "./pages/seller/layout";
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
            <Route path="/seller" element={<SellerLayout/>}>
            <Route path="/seller/products" element={<SellerProducts/>}/>
            </Route>
          </Routes>
        </Router>
      </div>
    </main>
  );
}

export default App;
