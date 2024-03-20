import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Pagenotfound from "./Pages/Pagenotfound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/user/Dashboard";
import Privateroute from "./Components/Routes/Privateroute";
import Forgot from "./Pages/Auth/Forgot";
import Admindashboard from "./Pages/Admin/Admindashboard";
import AdminRoute from "./Components/Routes/AdminRoute";
import CreateCategory from "./Components/CreateCategory";
import Createproduct from "./Components/Createproduct";
import Users from "./Components/Users";
import Orders from "./Pages/user/Orders";
import Profile from "./Pages/user/Profile";
import ProductDetails from "./Pages/ProductDetails";
import Categoryproduct from "./Components/Categoryproduct";
import Search from "./Pages/Search";
import Cartpage from "./Pages/CartPage";
import AdminOrders from "./Components/AdminOrders";
import About from "./Pages/About";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/dashboard" element={<Privateroute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>

      <Route exact path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<Admindashboard />} />
        <Route path="admin/create-product" element={<Createproduct />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/all-users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>

      <Route exact path="/logincheck" element={<Privateroute />}>
        <Route exact path="cartpage" element={<Cartpage />} />
      </Route>

      <Route exact path="/search/:keyword" element={<Search />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/forgot-password" element={<Forgot />} />
      <Route exact path="/category/:slug" element={<Categoryproduct />} />
      <Route exact path="/about" element={<About />} />

      <Route exact path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;
