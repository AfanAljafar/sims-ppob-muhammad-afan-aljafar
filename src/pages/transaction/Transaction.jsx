import React, { useEffect, useState } from "react";
import CardHistoryTx from "../../components/cardHistoryTx/CardHistoryTx";
import axios from "axios";
import { useSelector } from "react-redux";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const Transaction = () => {
  const token = useSelector((state) => state.auth.token);
  const [history, setHistory] = useState([]);
  const [limit, setLimit] = useState(5);

  const formatWIBDateTime = (isoString) => {
    const date = new Date(isoString);

    const tanggal = date.toLocaleDateString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const waktu = date.toLocaleTimeString("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${tanggal} ${waktu} WIB`;
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  useEffect(() => {
    const fetchHistoryTx = async () => {
      if (!token) {
        console.log("Tidak ada token.");
        return;
      }

      const endpoint = `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=0&limit=${limit}`;

      try {
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(res.data.data);
        setHistory(res.data.data.records);
      } catch (error) {
        console.error("Gagal ambil history:", error);
      }
    };
    fetchHistoryTx();
  }, [token, limit]);

  const handleShowMore = () => {
    setLimit((prev) => prev + 5);
  };

  return (
    <div className="w-screen min-h-fit px-28">
      <div className="fixed top-64 w-full z-40 bg-white">
        <h4 className="text-xl font-semibold">Semua Transaksi</h4>
        <div className="flex flex-row gap-3">
          {months.map((month, i) => (
            <h4 key={i} className="text-xl font-semibold">
              {month}
            </h4>
          ))}
        </div>
      </div>
      <div className="mt-80">
        <div className="flex flex-col gap-6">
          {history.map((record, i) => {
            const isTopup = record.transaction_type === "TOPUP";
            const sign = isTopup ? "+" : "-";
            const colorClass = isTopup ? "text-green-500" : "text-red-500";
            return (
              <CardHistoryTx
                key={i}
                nominal={`${sign}${formatRupiah(record.total_amount)}`}
                timestamp={formatWIBDateTime(record.created_on)}
                category={record.transaction_type}
                colorClass={colorClass}
              />
            );
          })}
        </div>
      </div>
      <div className="flex p-2 justify-center">
        <button
          onClick={handleShowMore}
          className="text-xl text-red-500 font-semibold cursor-pointer"
        >
          show more
        </button>
      </div>
    </div>
  );
};

export default Transaction;
