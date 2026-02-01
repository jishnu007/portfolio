import { Drawer } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeftThinCircleOutline } from "@mdi/js";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useEffect, useState, useRef } from "react";
import Resume from "./Resume";
import useScrollDirection from "../utils/useScrollDirection";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [navMenu, setNavMenu] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ transform: 'translateX(0px)', width: '0px' });
  
  // Derive currentSection from activeIndex for single source of truth
  const currentSection = ['home', 'about', 'projects', 'contact'][activeIndex];
  
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillContainerRef = useRef<HTMLDivElement | null>(null);
  const lastDetectedIndexRef = useRef(0); // Track last detected index to prevent redundant updates

  useEffect(() => {
    setHasMounted(true);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    setActiveIndex(index);
  };

  // Update slider position and width based on active nav item
  useEffect(() => {
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
    
    // Small delay to ensure DOM is ready
    setTimeout(updateSlider, 100);
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeIndex, hasMounted]);

  // Detect current section for chameleon effect - works with parallax container
  useEffect(() => {
    if (!hasMounted) return;

    const detectSectionColor = () => {
      const sections = [
        { id: 'home', element: document.getElementById('home') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'contact', element: document.getElementById('contact') },
      ];

      // Find which section is most visible in the viewport
      let bestSection = sections[0];
      let bestScore = -Infinity;
      
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          
          // Calculate visibility score: how much of this section is visible in viewport
          const viewportHeight = window.innerHeight;
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          // Score = visible pixels. Higher score = more visible
          if (visibleHeight > bestScore) {
            bestScore = visibleHeight;
            bestSection = section;
          }
        }
      }
      
      // Update activeIndex only if section actually changed
      const sectionToIndex: Record<string, number> = {
        'home': 0,
        'about': 1,
        'projects': 2,
        'contact': 3,
      };
      const newIndex = sectionToIndex[bestSection.id];
      
      if (newIndex !== undefined && newIndex !== lastDetectedIndexRef.current) {
        lastDetectedIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    // Detect on scroll within parallax container
    const parallaxContainer = document.querySelector('.parallaxContainer') || document.querySelector('[class*="parallax"]');
    
    if (parallaxContainer) {
      parallaxContainer.addEventListener('scroll', detectSectionColor, { passive: true });
    }
    
    // Fallback to window scroll
    window.addEventListener('scroll', detectSectionColor, { passive: true });
    
    // Initial detection with delays
    setTimeout(detectSectionColor, 100);
    setTimeout(detectSectionColor, 500);

    return () => {
      if (parallaxContainer) {
        parallaxContainer.removeEventListener('scroll', detectSectionColor);
      }
      window.removeEventListener('scroll', detectSectionColor);
    };
  }, [hasMounted]);

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
        `fp-viewing-${currentSection}`, // Add section class for CSS targeting
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
        <img 
          src="/logo.svg" 
          alt="logo" 
          width={180} 
          height={60}
        />
      </div>

      {/* Navigation links - Clean Frosted Glass Pill */}
      {
        <nav className="nano-pill-nav">
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
              ref={(el) => (navItemsRef.current[0] = el)}
              href="#home"
              className={`nano-pill__item ${activeIndex === 0 ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 0)}
            >
              Home
            </a>
            <a
              ref={(el) => (navItemsRef.current[1] = el)}
              href="#about"
              className={`nano-pill__item ${activeIndex === 1 ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 1)}
            >
              About
            </a>
            <a
              ref={(el) => (navItemsRef.current[2] = el)}
              href="#projects"
              className={`nano-pill__item ${activeIndex === 2 ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 2)}
            >
              Projects
            </a>
            <a
              ref={(el) => (navItemsRef.current[3] = el)}
              href="#contact"
              className={`nano-pill__item ${activeIndex === 3 ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 3)}
            >
              Contact
            </a>
          </div>
        </nav>
      }

      {/* Resume button and Hamburger for mobile */}
      {width && width > 769 ? (
        <button
          type="button"
          className={`resume-trigger ${visible ? "active" : ""}`}
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
      )}
    </div>
  );
};

export default Navbar;
