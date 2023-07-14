import React from "react";
import Logo from "../assets/logo.png";

function Header() {
  return (
    <header className="p-4 flex align-middle justify-center mb-4 border-b-8 pb-3 border-[#483285] md:pb-5">
      <img
        className="max-w-lg max-h-14"
        src={Logo}
        alt="Logo gobierno municipal de puebla"
      />
    </header>
  );
}

export default Header;
