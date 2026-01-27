import { Drawer } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeftThinCircleOutline } from "@mdi/js";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useEffect, useState } from "react";
import Resume from "./Resume";
import useScrollDirection from "../utils/useScrollDirection";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [navMenu, setNavMenu] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Only true after component mounts
  }, []);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);
  const handleMenuOpen = () => setNavMenu(!navMenu);
  const handleCloseMenu = () => setNavMenu(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const scrollDirection = useScrollDirection({ initialDirection: "down", thresholdPixels: 10 });

  const handleScroll = () => {
    setScrolledToTop(window.scrollY < 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Avoid rendering navigation until component has mounted
  if (!hasMounted) return null;

  return (
    <div
      className={[
        "fixed z-10 px-16 navbar justify-between items-center flex w-full",
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
        <img 
          src="/logo.svg" 
          alt="logo" 
          width={180} 
          height={60}
        />
      </div>

      {/* Navigation links */}
      {
        <ul className="navbar__nav flex text-center items-center font-bold text-xl">
          <li
            className="px-8"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="600"
          >
            <a href="#home">Home</a>
          </li>
          <li
            className="px-8"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <a href="#about">About</a>
          </li>
          <li
            className="px-8"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
          >
            <a href="#projects">Projects</a>
          </li>
          <li
            className="px-8"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="900"
          >
            <a href="#contact">Contact</a>
          </li>
        </ul>
      }

      {/* Resume button and Hamburger for mobile */}
      {width && width > 769 ? (
        <button
          className={`resume-btn ${visible ? "active aos-init aos-animate" : "aos-init aos-animate"}`}
          onClick={showDrawer}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1100"
        >
          Resume
        </button>
      ) : (
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
        open={visible}
        className="project-drawer"
      >
        <Resume />
      </Drawer>

      {/* Mobile Navigation */}
      {width && width <= 769 && (
        <div className={navMenu ? "mobile-nav opened" : "mobile-nav"}>
          <ul className="flex text-center items-center font-bold text-xl">
            <li className="px-8">
              <a href="#home" onClick={handleCloseMenu}>
                Home
              </a>
            </li>
            <li className="px-8" onClick={handleCloseMenu}>
              <a href="#about">About</a>
            </li>
            <li className="px-8" onClick={handleCloseMenu}>
              <a href="#projects">Projects</a>
            </li>
            <li className="px-8" onClick={handleCloseMenu}>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <button
            className={`resume-btn ${visible ? "active" : ""}`}
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
