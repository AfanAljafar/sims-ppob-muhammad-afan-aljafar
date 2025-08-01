import React from "react";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" min-w-screen h-16 flex flex-row px-28 items-center justify-between border-b border-gray-300 bg-white">
      <div>
        <Link to="/" className="flex flex-row items-center space-x-2">
          <img src={logo} alt="Logo" className="h-6" />
          <h3 className="font-bold">SIMS PPOB</h3>
        </Link>
      </div>

      <div className="flex flex-row space-x-10">
        <Link to="/topup">Top Up</Link>
        <Link to="/transaction">Transaction</Link>
        <Link to="/profile">Account</Link>
      </div>
    </div>
  );
};

export default Header;
