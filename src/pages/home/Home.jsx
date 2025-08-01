import React, { useEffect, useState } from "react";

// import Game from "../../assets/Game.png";
// import Kurban from "../../assets/Kurban.png";
// import Listrik from "../../assets/Listrik.png";
// import Musik from "../../assets/Musik.png";
// import PaketData from "../../assets/Paket Data.png";
// import PBB from "../../assets/PBB.png";
// import PDAM from "../../assets/PDAM.png";
// import PGN from "../../assets/Pulsa.png";
// import Pulsa from "../../assets/Pulsa.png";
// import Zakat from "../../assets/Zakat.png";
// import Televisi from "../../assets/Televisi.png";
// import VoucherMakanan from "../../assets/Voucher Makanan.png";
// import banner1 from "../../assets/Banner 1.png";
// import banner2 from "../../assets/Banner 2.png";
// import banner3 from "../../assets/Banner 3.png";
// import banner4 from "../../assets/Banner 4.png";
// import banner5 from "../../assets/Banner 5.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../redux/servicesSlice";

// const daftarLayanan = [
//   { src: PBB, desc: "PBB", path: "/" },
//   { src: Listrik, desc: "Listrik", path: "/listrik" },
//   { src: Pulsa, desc: "Pulsa", path: "/" },
//   { src: PDAM, desc: "PDAM", path: "/" },
//   { src: PGN, desc: "PGN", path: "/" },
//   { src: Televisi, desc: "TV\nLangganan", path: "/" },
//   { src: Musik, desc: "Musik", path: "/" },
//   { src: Game, desc: "Voucher\nGame", path: "/" },
//   { src: VoucherMakanan, desc: "Voucher\nMakanan", path: "/" },
//   { src: Kurban, desc: "Kurban", path: "/" },
//   { src: Zakat, desc: "Zakat", path: "/" },
//   { src: PaketData, desc: "Paket\nData", path: "/" },
// ];

// const daftarPromo = [
//   // { src: banner1, promo: "promo-1" },
//   // { src: banner2, promo: "promo-2" },
//   // { src: banner3, promo: "promo-3" },
//   // { src: banner4, promo: "promo-4" },
//   // { src: banner5, promo: "promo-5" },
//   // { src: banner5, promo: "promo-5" },
// ];

const Home = () => {
  const [daftarPromo, setDaftarPromo] = useState([]);
  const [daftarLayanan, setDaftarLayanan] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBanner = async () => {
      const endpoint = "https://take-home-test-api.nutech-integrasi.com/banner";

      try {
        const res = await axios.get(endpoint);
        setDaftarPromo(res.data.data);
        // console.log("ambil banner sukses");
      } catch (error) {
        console.error("Gagal ambil banner:", error);
      }
    };

    const fetchService = async () => {
      const endpoint =
        "https://take-home-test-api.nutech-integrasi.com/services";

      try {
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDaftarLayanan(res.data.data);
        dispatch(setServices(res.data.data));

        // console.log("ambil layanan sukses", res.data);
      } catch (error) {
        console.error("Gagal ambil layanan:", error);
      }
    };

    fetchBanner();
    fetchService();
  }, [token, dispatch]);

  return (
    <div className="w-screen min-h-fit px-28">
      <div className="flex flex-warp justify-center gap-x-6 pt-10 pb-4">
        {daftarLayanan.map((layanan, i) => (
          <Link
            key={i}
            to={layanan.service_code}
            className="flex flex-col items-center w-20 text-center"
          >
            <img
              src={layanan.service_icon}
              alt={layanan.service_code}
              className="w-10 h-10 mb-1"
            />
            <p className="text-sm leading-tight break-words">
              {layanan.service_name}
            </p>
          </Link>
        ))}
      </div>
      <div className="space-y-2">
        <p>Temukan promo menarik</p>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex flex-nowrap gap-8">
            {daftarPromo.map((promo, i) => (
              <div key={i} className="flex-shrink-0">
                <img src={promo.banner_image} alt={promo.banner_name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
