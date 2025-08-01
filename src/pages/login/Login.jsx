import React, { useState } from "react";
import poster from "../../assets/Illustrasi Login.png";
import logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, AtSign, X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isErr, setIsErr] = useState(false);

  const handleChange = (e) => {
    setFormLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formLogin.email.trim() || !formLogin.password.trim()) {
      alert("Email dan password tidak boleh kosong!");
      setIsLoading(false);
      return;
    }

    const endpoint = "https://take-home-test-api.nutech-integrasi.com/login";

    let payload = {
      email: formLogin.email,
      password: formLogin.password,
    };

    try {
      const res = await axios.post(endpoint, payload);
      const { token } = res.data.data;
      if (token) {
        localStorage.setItem("token", token);
        dispatch(login({ token }));
        // console.log(token);
      }
      // console.log("login berhasil:", res.data);
      setIsLoading(false);
      alert("Login Berhasil");
      setErrMessage("");
      navigate("/");
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data || error.message || "login gagal"
      );
      setIsLoading(false);
      // alert(error.response?.data?.message || "Login Gagal");
      setIsErr(true);
      setErrMessage(error.response?.data?.message || "Login Gagal");
    }
    setFormLogin({ email: "", password: "" });
  };

  return (
    <div className="flex flex-row">
      <div className="h-screen min-w-[50dvw] flex flex-col items-center justify-center px-30">
        <div className="space-y-6">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <img src={logo} alt="Logo" className="h-6" />
            <h1 className=" font-semibold text-xl">SIMS PPOB</h1>
          </div>
          <h1 className="whitespace-pre-line text-2xl font-semibold text-center">
            {`Masuk atau buat akun\nuntuk memulai`}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col w-full gap-6"
        >
          <div className="relative">
            <input
              name="email"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formLogin.email}
              placeholder="masukan email anda"
              className={`border rounded p-2 w-full pl-10 ${
                touched.email && !formLogin.email.trim()
                  ? "border-red-500"
                  : "border-slate-500"
              }`}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <AtSign size={20} />
            </span>
          </div>

          <div className="relative">
            <input
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={formLogin.password}
              placeholder="masukan password anda"
              className={`border  rounded p-2 w-full pr-10 pl-10 ${
                touched.password && !formLogin.password.trim()
                  ? "border-red-500"
                  : "border-slate-500"
              }`}
            />
            <span
              onClick={() => setPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <LockKeyhole size={20} />
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-red-500 text-white rounded p-2 transition duration-200 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-800"
            }`}
          >
            {isLoading ? "Loading..." : "Masuk"}
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-600">
          Belum punya akun?&nbsp;Registrasi&nbsp;
          <Link to="/registrasi" className="text-red-500 hover:underline">
            di sini
          </Link>
        </p>
        <span
          className={`${
            isErr ? "absolute" : "hidden"
          } flex flex-row min-w-[48dvw] px-2 py-2 mb-2 bg-red-200 text-red-500 rounded-lg text-sm bottom-0`}
        >
          {errMessage}
          <div
            onClick={() => {
              setIsErr(false);
            }}
            className="ml-auto cursor-pointer"
          >
            <X />
          </div>
        </span>
      </div>

      <div className="h-screen min-w-[50dvw]">
        <img src={poster} alt="Poster" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
