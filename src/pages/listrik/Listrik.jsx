import React, { useEffect, useState } from "react";
import ListrikIcon from "../../assets/Listrik.png";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import logo from "../../assets/Logo.png";
import success from "../../assets/check.png";
import fail from "../../assets/fail.png";

const Listrik = () => {
  const token = useSelector((state) => state.auth.token);
  const services = useSelector((state) => state.services.list);
  const [amount, setAmount] = useState("");

  const listrikService = services.find((s) => s.service_code === "PLN");
  const tariff = listrikService?.service_tariff;

  useEffect(() => {
    if (tariff) {
      // console.log("Tariff:", tariff);
      setAmount(tariff);
    }
  }, [tariff]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseInt(amount, 10);

    const result = await Swal.fire({
      html: `
    <div class="flex flex-col items-center text-center">
      <img src="${logo}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
      <p class="text-gray-600">Beli listrik prabayar senilai</p>
      <h2 class="text-xl font-bold text-black my-2">Rp${Number(
        amount
      ).toLocaleString("id-ID")} ?</h2>
    </div>
  `,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `<span class="text-red-600 font-semibold">Ya, lanjutkan Bayar</span>`,
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

    if (isNaN(parsedAmount) || parsedAmount < 10000) {
      Swal.fire({
        html: `
    <div class="flex flex-col items-center text-center">
      <img src="${fail}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
      <p class="text-gray-600">Pembayaran listrik senilai</p>
      <h2 class="text-xl font-bold text-black my-2">Rp${Number(
        amount
      ).toLocaleString("id-ID")} </h2>
      <p class="text-gray-600">Gagal!</p>
      <p class="text-gray-600">Nominal minimal adalah Rp 10.000 dan maksimal Rp 1.000.000!</p>
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

    const endpoint =
      "https://take-home-test-api.nutech-integrasi.com/transaction";
    const payload = {
      service_code: "PLN",
      amount: parsedAmount,
    };

    try {
      const res = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Berhasil:", res.data);

      Swal.fire({
        html: `
    <div class="flex flex-col items-center text-center">
      <img src="${success}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
      <p class="text-gray-600">Pembayaran listrik senilai</p>
      <h2 class="text-xl font-bold text-black my-2">Rp${Number(
        amount
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

      setAmount("");
    } catch (error) {
      console.error("Gagal melakukan transaksi:", error);
      Swal.fire({
        html: `
    <div class="flex flex-col items-center text-center">
      <img src="${fail}" alt="Icon" class="w-[70px] h-[70px] mb-4" />
      <p class="text-gray-600">Pembayaran listrik prabayar sebesar</p>
      <h2 class="text-xl font-bold text-black my-2">Rp${Number(
        amount
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
    }
  };

  return (
    <div className="w-screen min-h-fit px-28">
      <div className="flex flex-col pt-10 pb-4">
        <p>Pembayaran</p>
        <div className="flex flex-row items-center">
          <img src={ListrikIcon} alt="icon-listrik" className="h-10 w-10" />
          <p className="font-semibold">Listrik Prabayar</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="number"
            placeholder="nominal bayar"
            value={amount}
            readOnly
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-fit rounded border border-slate-500 p-2"
          />
          <button
            type="submit"
            className="w-full h-fit rounded bg-red-500 p-2 font-bold text-white"
          >
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Listrik;
