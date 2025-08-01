import React, { useEffect, useState } from "react";
import bgSaldo from "../../assets/Background Saldo.png";
import profilPhoto from "../../assets/Profile Photo.png";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
  const [isSaldoVisible, setSaldoVisible] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [dataProfile, setDataProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  });
  const [balance, setBalance] = useState({ balance: 0 });

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.log("Tidak ada token.");
        return;
      }

      const endpoint =
        "https://take-home-test-api.nutech-integrasi.com/profile";

      try {
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Profil:", res.data);
        setDataProfile(res.data.data);
      } catch (error) {
        console.error("Gagal ambil profil:", error);
      }
    };

    const fetchBalance = async () => {
      if (!token) {
        console.log("Tidak ada token.");
        return;
      }

      const endpoint =
        "https://take-home-test-api.nutech-integrasi.com/balance";

      try {
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Balance:", res.data);
        setBalance(res.data.data);
      } catch (error) {
        console.error("Gagal ambil balance saldo:", error);
      }
    };
    fetchProfile();
    fetchBalance();
  }, [token]);

  return (
    <div className="w-screen min-h-fit px-28 pt-8 bg-white">
      <div className="flex flex-row">
        <div>
          <img
            src={
              !dataProfile.profile_image ||
              dataProfile.profile_image.includes("null")
                ? profilPhoto
                : dataProfile.profile_image
            }
            alt="profile-photo"
            className="w-17 h-17 rounded-full border border-slate-300 object-cover"
          />
          <h3 className="text-lg">Selamat Datang,</h3>
          <h2 className="text-2xl">
            {`${dataProfile.first_name} ${dataProfile.last_name}`}
          </h2>
        </div>
        <div className="ml-auto relative">
          <img
            src={bgSaldo}
            alt="background-saldo"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col text-white py-5 px-5 justify-around">
            <p>Saldo anda</p>
            {isSaldoVisible ? (
              <h1 className="text-3xl">{formatRupiah(balance.balance)}</h1>
            ) : (
              <h1 className="text-3xl">Rp * * * * * * * * * * *</h1>
            )}

            <div className="flex flex-row items-center">
              <p className="text-sm">Lihat Saldo &nbsp;</p>
              <span
                onClick={() => setSaldoVisible(!isSaldoVisible)}
                className="cursor-pointer"
              >
                {isSaldoVisible ? <EyeOff size={14} /> : <Eye size={14} />}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
