/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/logo.svg";
const Navbar = () => {
  return (
    <div className="absolute z-10 px-16 navbar justify-between flex w-full">
      <div
        className="navbar__logo flex"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="700"
      >
        {/* <Image src={Logo} alt="logo" width={180} height={90} /> */}
        <Logo width={180} height={90} />
      </div>
      <ul className="navbar__nav flex text-center items-center font-bold text-xl">
        <li className="px-8">
          <a href="#home">Home</a>{" "}
        </li>
        <li className="px-8">
          <a href="#about">About</a>{" "}
        </li>
        <li className="px-8">
          <a href="#projects">Projects</a>
        </li>
        <li className="px-8">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <img src="/hamburger.png" alt="hamburger" width="42px" height="42px" />
    </div>
  );
};
export default Navbar;
