import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
  </div>
);

const Layout = lazy(() => import("./layout/Layout"));
const Login = lazy(() => import("./pages/login/Login"));
const Registrasi = lazy(() => import("./pages/registrasi/Registrasi"));
const Home = lazy(() => import("./pages/home/Home"));
const Listrik = lazy(() => import("./pages/listrik/Listrik"));
const TopUp = lazy(() => import("./pages/topup/TopUp"));
const Transaction = lazy(() => import("./pages/transaction/Transaction"));
const Akun = lazy(() => import("./pages/akun/Akun"));
const ProtectedRoute = lazy(() => import("./components/authGuard/AuthGuard"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}

export default App;
