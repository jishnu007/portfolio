/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/images/logo.svg";
import Hamburger from "../assets/images/hamburger.svg";
import { Drawer, Button, Carousel } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeftThinCircleOutline } from "@mdi/js";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useEffect, useState } from "react";
import Resume from "./Resume";
import useScrollDirection from "../utils/useScrollDirection";
const Navbar = () => {
  const { height, width }: any = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [navMenu, setNavMenu] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleMenuOpen = () => {
    setNavMenu(!navMenu);
  };
  const handleCloseMenu = () => {
    setNavMenu(false);
  };
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const scrollDirection = useScrollDirection("down" as any);
  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={[
        "absolute z-10 px-16 navbar justify-between items-center flex w-full",
        scrollDirection === "up" && !scrolledToTop ? "navbar-droped-up" : "",
        scrollDirection === "down" && !scrolledToTop
          ? "navbar-droped-down"
          : "",
      ].join(" ")}
    >
      <div
        id="nav_id"
        className="navbar__logo flex"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="700"
      >
        <Image src={Logo} alt="logo" width={180} height={90} />
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
      {width > 769 && (
        <button
          className={visible ? "resume-btn active" : "resume-btn"}
          onClick={showDrawer}
        >
          Resume
        </button>
      )}

      {width <= 769 && (
        <div className="hamburger">
          <button
            className={navMenu ? "menu opened" : "menu"}
            onClick={handleMenuOpen}
            aria-label="Main Menu"
          >
            <svg width="60" height="60" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
        </div>
      )}
      <Drawer
        title="Resume"
        placement="left"
        onClose={onClose}
        closable={true}
        width={width && width > 968 ? "40%" : "100%"}
        closeIcon={
          <Icon
            path={mdiArrowLeftThinCircleOutline}
            size={1}
            vertical
            color="#2c281d"
          />
        }
        visible={visible}
        className="project-drawer"
      >
        <Resume />
      </Drawer>
      {width <= 769 && (
        <div className={navMenu ? "mobile-nav opened" : "mobile-nav"}>
          <ul className="flex text-center items-center font-bold text-xl">
            <li className="px-8">
              <a href="#home" onClick={handleCloseMenu}>
                Home
              </a>{" "}
            </li>
            <li className="px-8" onClick={handleCloseMenu}>
              <a href="#about" onClick={handleCloseMenu}>
                About
              </a>{" "}
            </li>
            <li className="px-8" onClick={handleCloseMenu}>
              <a href="#projects">Projects</a>
            </li>
            <li className="px-8" onClick={handleCloseMenu}>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <button
            className={visible ? "resume-btn active" : "resume-btn"}
            onClick={showDrawer}
          >
            Resume
          </button>
        </div>
      )}
    </div>
  );
};
export default Navbar;
