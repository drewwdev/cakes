import OrdersDashboard from "./admin/components/OrdersDashboard";
import OrderForm from "./user/components/OrderForm";
import AdminCakePage from "./admin/pages/AdminCakePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/api/cakes" element={<AdminCakePage />} />
        <Route path="/orders" element={<OrdersDashboard />} />
        <Route path="/api/orders" element={<OrderForm />} />
      </Routes>
    </div>
  );
}

export default App;
