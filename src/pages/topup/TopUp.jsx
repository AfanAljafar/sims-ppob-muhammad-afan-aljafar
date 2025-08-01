import axios from "axios";
import { CreditCard } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import fail from "../../assets/fail.png";
import logo from "../../assets/Logo.png";
import success from "../../assets/check.png";

const TopUp = () => {
  const token = useSelector((state) => state.auth.token);
  const [amount, setAmount] = useState({ top_up_amount: 0 });
  const [enable, setEnable] = useState(false);

  const OptionNominal = [
    { top_up_amount: 10000 },
    { top_up_amount: 20000 },
    { top_up_amount: 50000 },
    { top_up_amount: 100000 },
    { top_up_amount: 250000 },
    { top_up_amount: 500000 },
  ];

  const topUpValue = parseInt(amount.top_up_amount, 10);

  const isAmountValid = topUpValue >= 10000 && topUpValue <= 1000000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      html: `
        <div class="flex flex-col items-center text-center">
          <img src="${logo}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
          <p class="text-gray-600">Anda yakin untuk Top Up sebesar</p>
          <h2 class="text-xl font-bold text-black my-2">Rp${Number(
            topUpValue
          ).toLocaleString("id-ID")} ?</h2>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `<span class="text-red-600 font-semibold">Ya, lanjutkan Top Up</span>`,
      cancelButtonText: `<span class="text-gray-400">Batalkan</span>`,
      buttonsStyling: false,
      customClass: {
        actions: "swal2-actions-vertical-tailwind",
        confirmButton: "cursor-pointer",
        cancelButton: "cursor-pointer",
      },
    });
    if (!result.isConfirmed) return;

    if (!token) {
      Swal.fire({
        html: `
            <div class="flex flex-col items-center text-center">
              <img src="${fail}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
              <p class="text-gray-600">Akun tidak ditemukan</p>
            </div>
          `,
        confirmButtonText: `<span class="text-red-600 font-semibold">Kembali ke Beranda</span>`,
        buttonsStyling: false,
        customClass: {
          actions: "swal2-actions-vertical-tailwind",
          confirmButton: "cursor-pointer bg-transparent",
          cancelButton: "",
        },
      });
      return;
    }

    if (!isAmountValid) {
      Swal.fire({
        html: `
            <div class="flex flex-col items-center text-center">
              <img src="${fail}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
              <h2 class="text-xl font-bold text-black my-2">Nominal tidak valid.</h2>
              <p class="text-gray-600">Masukkan nominal Top Up yang valid (lebih dari 10.000 dan tidak lebih dari 1.000.000)!</p>
            </div>
          `,
        confirmButtonText: `<span class="text-red-600 font-semibold">Kembali ke Beranda</span>`,
        buttonsStyling: false,
        customClass: {
          actions: "swal2-actions-vertical-tailwind",
          confirmButton: "cursor-pointer bg-transparent",
          cancelButton: "",
        },
      });
      return;
    }

    setEnable(true);

    const endpoint = "https://take-home-test-api.nutech-integrasi.com/topup";
    const payload = { top_up_amount: topUpValue };

    try {
      const res = await axios.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        html: `
            <div class="flex flex-col items-center text-center">
              <img src="${success}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
              <p class="text-gray-600">Top Up sebesar</p>
              <h2 class="text-xl font-bold text-black my-2">Rp${Number(
                topUpValue
              ).toLocaleString("id-ID")} </h2>
              <p class="text-gray-600">Berhasil!</p>
            </div>
          `,
        confirmButtonText: `<span class="text-red-600 font-semibold">Kembali ke Beranda</span>`,
        buttonsStyling: false,
        customClass: {
          actions: "swal2-actions-vertical-tailwind",
          confirmButton: "cursor-pointer bg-transparent",
          cancelButton: "",
        },
      });
      // console.log("Top Up Berhasil", res.data);
      setAmount({ top_up_amount: 0 });
    } catch (error) {
      Swal.fire({
        html: `
            <div class="flex flex-col items-center text-center">
              <img src="${success}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
              <p class="text-gray-600">Top Up sebesar</p>
              <h2 class="text-xl font-bold text-black my-2">Rp${Number(
                topUpValue
              ).toLocaleString("id-ID")} </h2>
              <p class="text-gray-600">Gagal!</p>
            </div>
          `,
        confirmButtonText: `<span class="text-red-600 font-semibold">Kembali ke Beranda</span>`,
        buttonsStyling: false,
        customClass: {
          actions: "swal2-actions-vertical-tailwind",
          confirmButton: "cursor-pointer bg-transparent",
          cancelButton: "",
        },
      });
      console.error("Gagal Top Up:", error);
    }
  };

  const handleChange = (e) => {
    setAmount((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-screen min-h-fit px-28">
      <div className="flex flex-col pt-10 pb-4">
        <p>Silahkan Masukan</p>
        <h2 className="text-2xl font-semibold">Nominal Top Up</h2>
      </div>
      <div className="flex flex-row gap-6">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                name="top_up_amount"
                type="number"
                value={amount.top_up_amount}
                onChange={handleChange}
                placeholder="Mauskan nominal top up"
                className="w-full h-fit rounded border border-slate-500 p-2 pl-10"
              />
              <span className="absolute left-2 bottom-2 text-gray-400">
                <CreditCard />
              </span>
            </div>
            <button
              type="submit"
              disabled={!isAmountValid || enable}
              className={`w-full h-fit rounded  p-2 font-bold text-white ${
                enable
                  ? "bg-gray-400 cursor-not-allowed"
                  : isAmountValid
                  ? "bg-red-500 hover:bg-red-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Top Up
            </button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-6">
          {OptionNominal.map((nominal, i) => (
            <div
              key={i}
              onClick={() =>
                setAmount({ top_up_amount: nominal.top_up_amount })
              }
              className="py-2 px-10 border rounded border-slate-500 flex items-center justify-center cursor-pointer"
            >
              {nominal.top_up_amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUp;
