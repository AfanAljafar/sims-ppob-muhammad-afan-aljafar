import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import axios from "axios";
import profilPhoto from "../../assets/Profile Photo.png";
import { Pencil, AtSign, User, Trophy } from "lucide-react";

const Akun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [dataProfile, setDataProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  });
  const [editProfile, setEditProfile] = useState({
    first_name: "",
    last_name: "",
  });

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
        setEditProfile({
          first_name: res.data.data.first_name,
          last_name: res.data.data.last_name,
        });
      } catch (error) {
        console.error("Gagal ambil profil:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Tidak ada token.");
      return;
    }

    const endpoint =
      "https://take-home-test-api.nutech-integrasi.com/profile/update";

    let payload = {
      first_name: editProfile.first_name,
      last_name: editProfile.last_name,
    };

    try {
      const res = await axios.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Update berhasil:", res.data);
      alert("Profil berhasil diperbarui");
      setIsEdit(false);
      setDataProfile((prev) => ({
        ...prev,
        ...payload,
      }));
    } catch (error) {
      console.error("Gagal update profil:", error);
      alert("Gagal update profil");
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Tidak ada token.");
      return;
    }
    const file = e.target.files[0];
    if (!file) return;

    const endpoint =
      "https://take-home-test-api.nutech-integrasi.com/profile/image";

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Upload berhasil:", res.data);
      alert("Foto profil berhasil diperbarui");
      setDataProfile((prev) => ({
        ...prev,
        profile_image: res.data.data.profile_image,
      }));
    } catch (error) {
      console.error("Gagal upload foto:", error);
      alert("Gagal upload foto profil");
    }
  };

  const handleChange = (e) => {
    setEditProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditProfile({
      first_name: dataProfile.first_name,
      last_name: dataProfile.last_name,
    });
  };

  const handleEditMode = () => {
    setIsEdit(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <Header />
      <div className="w-screen min-h-fit px-28 pt-8">
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <img
              src={
                !dataProfile.profile_image ||
                dataProfile.profile_image.includes("null")
                  ? profilPhoto
                  : dataProfile.profile_image
              }
              alt="profile-image"
              className="w-16 h-16 rounded-full border border-slate-300 object-cover"
            />
            <label>
              <input
                name="profile_image"
                type="file"
                accept="image/*"
                id="upload-photo"
                className="hidden"
                onChange={handleUploadImage}
              />
              <div className="absolute bottom-0 right-0 rounded-full bg-slate-100 h-fit border border-slate-300 p-0.5">
                <Pencil size={13} />
              </div>
            </label>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-center">{`${dataProfile.first_name} ${dataProfile.last_name}`}</h1>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <label>
                Email
                <input
                  type="email"
                  placeholder={dataProfile.email}
                  readOnly
                  className="w-full h-fit p-2 border border-slate-500 rounded mt-2 pl-10"
                />
              </label>
              <span className="absolute left-3 bottom-0 -translate-y-1/2 text-gray-500">
                <AtSign size={20} />
              </span>
            </div>

            <div className="relative">
              <label>
                Nama Depan
                <input
                  name="first_name"
                  type="text"
                  placeholder={dataProfile.first_name}
                  value={editProfile.first_name}
                  onChange={handleChange}
                  readOnly={!isEdit}
                  className="w-full h-fit p-2 border border-slate-500 rounded mt-2 pl-10"
                />
                <span className="absolute left-3 bottom-0 -translate-y-1/2 text-gray-500">
                  <User size={20} />
                </span>
              </label>
            </div>

            <div className="relative">
              <label>
                Nama Belakang
                <input
                  name="last_name"
                  type="text"
                  placeholder={dataProfile.last_name}
                  value={editProfile.last_name}
                  onChange={handleChange}
                  readOnly={!isEdit}
                  className="w-full h-fit p-2 border border-slate-500 rounded mt-2 pl-10"
                />
                <span className="absolute left-3 bottom-0 -translate-y-1/2 text-gray-500">
                  <User size={20} />
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`bg-red-500 text-white w-full p-2 h-fit rounded font-semibold ${
                isEdit ? "block" : "hidden pointer-events-none"
              }`}
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`bg-white text-red-500 w-full p-2 h-fit rounded border border-red-500 font-semibold ${
                isEdit ? "block" : "hidden pointer-events-none"
              }`}
            >
              Batalkan
            </button>
          </form>
          <button
            type="button"
            onClick={handleEditMode}
            className={`bg-white text-red-500 w-full p-2 h-fit rounded border border-red-500 font-semibold mt-6 ${
              isEdit ? "hidden pointer-events-none" : "block"
            }`}
          >
            Edit Profil
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className={`bg-red-500 text-white w-full p-2 h-fit rounded font-semibold mt-6 ${
              isEdit ? "hidden pointer-events-none" : "block"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Akun;
