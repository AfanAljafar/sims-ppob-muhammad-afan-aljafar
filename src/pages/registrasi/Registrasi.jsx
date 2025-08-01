import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import poster from "../../assets/Illustrasi Login.png";
import logo from "../../assets/Logo.png";
import { Eye, EyeOff, LockKeyhole, AtSign, User } from "lucide-react";
import axios from "axios";

const Registrasi = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formRegistrasi, setFormRegistrasi] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    first_name: false,
    last_name: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormRegistrasi((prev) => ({
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

    if (formRegistrasi.password !== formRegistrasi.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    const endpoint =
      "https://take-home-test-api.nutech-integrasi.com/registration";

    let payload = {
      email: formRegistrasi.email,
      first_name: formRegistrasi.first_name,
      last_name: formRegistrasi.last_name,
      password: formRegistrasi.password,
    };

    try {
      const res = await axios.post(endpoint, payload);
      // console.log("registrasi berhasil:", res);
      alert("Registrasi Berhasil");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data || error.message || "Terjadi kesalahan"
      );
      alert("Registrasi Gagal");
    }
    setFormRegistrasi({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    });
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
            {`Lengkapi data untuk\nmembuat akun`}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col w-full gap-4"
        >
          <div className="relative">
            <input
              name="email"
              type="email"
              value={formRegistrasi.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="masukan email anda"
              className={`border rounded p-2 w-full pl-10 ${
                touched.email && !formRegistrasi.email.trim()
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
              name="first_name"
              type="text"
              value={formRegistrasi.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="nama depan"
              className={`border rounded p-2 w-full pl-10 ${
                touched.first_name && !formRegistrasi.first_name.trim()
                  ? "border-red-500"
                  : "border-slate-500"
              }`}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <User size={20} />
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              name="last_name"
              value={formRegistrasi.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="nama belakang"
              className={`border rounded p-2 w-full pl-10 ${
                touched.last_name && !formRegistrasi.last_name.trim()
                  ? "border-red-500"
                  : "border-slate-500"
              }`}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <User size={20} />
            </span>
          </div>

          <div className="relative">
            <input
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              value={formRegistrasi.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="buat password"
              className={`border rounded p-2 w-full pr-10 pl-10 ${
                touched.password && !formRegistrasi.password.trim()
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

          <div className="relative">
            <input
              name="confirmPassword"
              type={isPasswordVisible ? "text" : "password"}
              value={formRegistrasi.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="konfirmasi password"
              className={`border rounded p-2 w-full pr-10 pl-10 ${
                touched.confirmPassword &&
                !formRegistrasi.confirmPassword.trim()
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
            className="bg-red-500 text-white rounded p-2 hover:bg-red-800 transition duration-200 cursor-pointer"
          >
            Daftar
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-600">
          sudah punya akun?&nbsp;login&nbsp;
          <Link to="/login" className="text-red-500 hover:underline">
            di sini
          </Link>
        </p>
      </div>
      <div className="h-screen min-w-[50dvw]">
        <img src={poster} alt="Poster" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Registrasi;
