import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";
import Registrasi from "./pages/registrasi/Registrasi";
import Home from "./pages/home/Home";
import Listrik from "./pages/listrik/Listrik";
import TopUp from "./pages/topup/TopUp";
import Transaction from "./pages/transaction/Transaction";
import Akun from "./pages/akun/Akun";
import ProtectedRoute from "./components/authGuard/AuthGuard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrasi" element={<Registrasi />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Akun />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="topup" element={<TopUp />} />
          <Route path="PLN" element={<Listrik />} />
          <Route path="transaction" element={<Transaction />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
