import { Drawer } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeftThinCircleOutline } from "@mdi/js";
import Image from "next/image";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useEffect, useState, useRef, useCallback, memo, useMemo } from "react";
import Resume from "./Resume";
import useScrollDirection from "../utils/useScrollDirection";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [navMenu, setNavMenu] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({
    transform: "translateX(0px)",
    width: "0px",
  });
  const [scrolledToTop, setScrolledToTop] = useState(true);

  // Memoize section names to prevent re-creation
  const sectionNames = useMemo(() => ["home", "about", "projects", "contact"], []);
  const currentSection = sectionNames[activeIndex];

  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillContainerRef = useRef<HTMLDivElement | null>(null);
  const lastDetectedIndexRef = useRef(0);
  const isClickNavigatingRef = useRef(false);

  const scrollDirection = useScrollDirection({
    initialDirection: "down",
    thresholdPixels: 10,
  });

  // Mount check
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const showDrawer = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);
  const handleMenuOpen = useCallback(() => setNavMenu((prev) => !prev), []);
  const handleCloseMenu = useCallback(() => setNavMenu(false), []);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolledToTop(window.scrollY < 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (_e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      // Disable scroll detection during click navigation
      isClickNavigatingRef.current = true;
      lastDetectedIndexRef.current = index;
      setActiveIndex(index);
      
      // Re-enable scroll detection after smooth scroll completes
      setTimeout(() => {
        isClickNavigatingRef.current = false;
      }, 1000);
    },
    [activeIndex]
  );

  // Update slider position and width based on active nav item
  useEffect(() => {
    if (!hasMounted) return;

    const updateSlider = () => {
      const activeItem = navItemsRef.current[activeIndex];
      const container = pillContainerRef.current;
      if (activeItem && container) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const offsetLeft = itemRect.left - containerRect.left;

        setSliderStyle({
          transform: `translateX(${offsetLeft}px)`,
          width: `${itemRect.width}px`,
        });
      }
    };

    // Delay to ensure DOM is ready
    const timeoutId = setTimeout(updateSlider, 100);
    window.addEventListener("resize", updateSlider, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateSlider);
    };
  }, [activeIndex, hasMounted, sectionNames]);

  // Detect current section for chameleon effect
  useEffect(() => {
    if (!hasMounted) return;

    let ticking = false;

    const detectSectionColor = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const sections = sectionNames.map((id) => ({
          id,
          element: document.getElementById(id),
        }));

        // Find which section is most visible in viewport
        let bestSection = sections[0];
        let bestScore = -Infinity;

        for (const section of sections) {
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(viewportHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (visibleHeight > bestScore) {
              bestScore = visibleHeight;
              bestSection = section;
            }
          }
        }

        const sectionToIndex: Record<string, number> = {
          home: 0,
          about: 1,
          projects: 2,
          contact: 3,
        };
        const newIndex = sectionToIndex[bestSection.id];

        // Only update if not currently navigating via click
        if (!isClickNavigatingRef.current && newIndex !== undefined && newIndex !== lastDetectedIndexRef.current) {
          lastDetectedIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }

        ticking = false;
      });
    };

    // Detect on scroll within parallax container
    const parallaxContainer =
      document.querySelector(".parallaxContainer") ||
      document.querySelector('[class*="parallax"]');

    if (parallaxContainer) {
      parallaxContainer.addEventListener("scroll", detectSectionColor, {
        passive: true,
      });
    }

    // Fallback to window scroll
    window.addEventListener("scroll", detectSectionColor, { passive: true });

    // Initial detection
    const timeoutId1 = setTimeout(detectSectionColor, 100);
    const timeoutId2 = setTimeout(detectSectionColor, 500);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      if (parallaxContainer) {
        parallaxContainer.removeEventListener("scroll", detectSectionColor);
      }
      window.removeEventListener("scroll", detectSectionColor);
    };
  }, [hasMounted, sectionNames]);

  // Avoid rendering navigation until component has mounted
  // Use CSS to hide instead of returning null to prevent hydration mismatch
  const displayStyle = hasMounted ? {} : { visibility: "hidden" as const };

  return (
    <div
      style={displayStyle}
      className={[
        "fixed z-10 px-16 navbar justify-between items-center flex w-full",
        scrollDirection === "up" && !scrolledToTop ? "navbar-droped-up" : "",
        scrollDirection === "down" && !scrolledToTop
          ? "navbar-droped-down"
          : "",
        `fp-viewing-${currentSection}`,
      ].join(" ")}
      data-current-section={currentSection}
    >
      <div
        id="nav_id"
        className="navbar__logo flex"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="700"
      >
        <Image
          src="/logo.svg"
          alt="logo"
          width={180}
          height={60}
          priority
        />
      </div>

      {/* Navigation links - Clean Frosted Glass Pill */}
      <nav className="nano-pill-nav" style={{ visibility: hasMounted ? "visible" : "hidden" }}>
        <div 
          className={`nano-pill nano-pill--${currentSection}`} 
          ref={pillContainerRef}
          data-current-section={currentSection}
        >
          <div 
            className="nano-pill__slider"
            style={sliderStyle}
          />
          <a
            ref={(el) => {
              navItemsRef.current[0] = el;
            }}
            href="#home"
            className={`nano-pill__item ${activeIndex === 0 ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 0)}
          >
            Home
          </a>
          <a
            ref={(el) => {
              navItemsRef.current[1] = el;
            }}
            href="#about"
            className={`nano-pill__item ${activeIndex === 1 ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 1)}
          >
            About
          </a>
          <a
            ref={(el) => {
              navItemsRef.current[2] = el;
            }}
            href="#projects"
            className={`nano-pill__item ${activeIndex === 2 ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 2)}
          >
            Projects
          </a>
          <a
            ref={(el) => {
              navItemsRef.current[3] = el;
            }}
            href="#contact"
            className={`nano-pill__item ${activeIndex === 3 ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 3)}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Resume button and Hamburger for mobile - Always render both, use CSS to hide */}
      <button
        type="button"
        className={`resume-trigger ${visible ? "active" : ""} ${!hasMounted || (width && width <= 769) ? "hidden" : ""}`}
        onClick={showDrawer}
        aria-label="View Resume"
        style={{ display: hasMounted && width && width > 769 ? "flex" : "none" }}
      >
        <svg 
          className="resume-trigger__icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M14 2V8H20" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M16 13H8" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M16 17H8" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M10 9H9H8" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className="resume-trigger__text">Resume</span>
      </button>
      
      <div 
        className="hamburger" 
        style={{ display: hasMounted && width && width <= 769 ? "block" : "none" }}
      >
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

      <Drawer
        title="Resume"
        placement="left"
        onClose={onClose}
        closable={true}
        width={hasMounted && width && width > 968 ? "40%" : "100%"}
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

      {/* Mobile Navigation - Always render, control visibility with CSS */}
      <div 
        className={navMenu ? "mobile-nav opened" : "mobile-nav"}
        style={{ display: hasMounted && width && width <= 769 ? "flex" : "none" }}
      >
        <ul className="mobile-nav__list">
          <li>
            <a 
              href="#home" 
              onClick={(e) => {
                handleCloseMenu();
                handleNavClick(e, 0);
              }} 
              className={`mobile-nav__item ${activeIndex === 0 ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => {
                handleCloseMenu();
                handleNavClick(e, 1);
              }} 
              className={`mobile-nav__item ${activeIndex === 1 ? 'active' : ''}`}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              onClick={(e) => {
                handleCloseMenu();
                handleNavClick(e, 2);
              }} 
              className={`mobile-nav__item ${activeIndex === 2 ? 'active' : ''}`}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => {
                handleCloseMenu();
                handleNavClick(e, 3);
              }} 
              className={`mobile-nav__item ${activeIndex === 3 ? 'active' : ''}`}
            >
              Contact
            </a>
          </li>
        </ul>
        
        <button
          type="button"
          className={`resume-trigger resume-trigger--mobile ${visible ? "active" : ""}`}
          onClick={showDrawer}
          aria-label="View Resume"
        >
          <svg 
            className="resume-trigger__icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M14 2V8H20" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M16 13H8" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M16 17H8" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M10 9H9H8" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="resume-trigger__text">Resume</span>
        </button>
      </div>
    </div>
  );
};

// Memoize Navbar to prevent unnecessary re-renders
export default memo(Navbar);
