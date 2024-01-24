import PostCakes from "./components/PostCakes";
import CakeList from "./components/CakeList";
import OrdersDashboard from "./components/OrdersDashboard";
import OrderForm from "./components/OrderForm";

function App() {
  return (
    <div>
      <PostCakes />
      <CakeList />
      <OrderForm />
      <OrdersDashboard />
    </div>
  );
}

export default App;
