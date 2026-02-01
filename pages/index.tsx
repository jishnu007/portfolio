/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { TextLoop } from "../components/TextLoop";
import useWindowDimensions from "../utils/useWindowDimensions";
import type { AnimationState, Project } from "../types";

// Lazy load heavy components with no SSR and loading state
const DynamicCloud = dynamic(
  () => import("../utils/dynamic-cloud").then((mod) => mod.DynamicCloud),
  { 
    ssr: false,
    loading: () => <div style={{ height: '400px' }} />, 
  }
);

// Lazy load ProjectCard with SSR but deferred hydration
const ProjectCard = dynamic(() => import("../components/ProjectCard"), {
  loading: () => <div style={{ height: '300px', background: '#f0f0f0', borderRadius: '8px' }} />,
});

// Lazy load ContactMe - it's below the fold
const ContactMe = dynamic(() => import("../components/ContactMe"), {
  loading: () => <div style={{ height: '500px' }} />,
  ssr: false,
});

const Home: NextPage = () => {
  const { height, width } = useWindowDimensions();
  const [hasAnimated, setHasAnimated] = useState<AnimationState>({
    hero: false,
    about: false,
    projects: false,
    contact: false,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  // Memoize projects data to prevent re-creation on every render
  const projects = useMemo<Project[]>(
    () => [
      {
        id: 0,
        title: "Thoughtspot",
        images: ["/ts1.webp", "/ts2.webp", "/ts3.webp", "/ts4.webp", "/ts5.webp"],
        smalldesc: "AI-Powered Analytics for your modern data stack.",
        desc: "ThoughtSpot is an AI-powered business intelligence and data analytics platform that enables users to analyze and visualize data through simple, search-driven interactions.",
        responsibilities: [
          "Implemented Version control for dashboards, analyzed answers and worksheets by leveraging functionalities of git, which helped users to collaborate and keeping track of their changes",
          "Led a frontend team of four in revamping the data connection flow to improve UI/UX and transitioning the module to a Micro-Frontend (MFE) Architecture.",
          "Contributed to the development of Spotapps feature, enabling customers to analyze data without complex modeling, reducing onboarding time by 70%.",
          "Collaborated in developing the Thoughtspot component library, improving design consistency and significantly increased code reusability.",
          "Wrote high quality unit tests using Jest and end-to-end automation tests using playwright",
          "Working in the Agile programming environment to define stories, do estimates and plan sprints.",
        ],
        tags: ["React", "TypeScript", "Sass", "GraphQL", "Jest", "Playwright"],
        link: "https://www.thoughtspot.com/",
      },
      {
        id: 1,
        title: "Utilizecore",
        images: [
          "/UtilizeCore-1.webp",
          "/UtilizeCore-2.webp",
          "/UtilizeCore-3.webp",
        ],
        smalldesc:
          "A game-changing platform that has reshaped service management processes.",
        desc: "Utilizecore is service managment platform which help Businesses manage thier subcontractor network, clients and locations being serviced more efficiently.",
        responsibilities: [
          "Worked as a part of agile team for transforming the legacy code which was written in ROR to the VueJs and make the UI more functional",
          "Have worked on transforming the design which was provided by the designer to life",
          "Have worked on different modules like workorders,invoices,timetracker etc..",
          "Have worked on login/registeration flow pages",
        ],
        tags: ["Vue JS", "Vuetify", "Composition API", "TypeScript", "Sass"],
        link: "https://utilizecore.com/",
      },
      {
        id: 2,
        title: "Experience",
        images: ["/experianceHome.webp", "/experianceInner.webp"],
        smalldesc: "Experience Management Platform",
        desc: "Customer Experience rating and search site for Mortgage, Brokers, Loan officers,Real Estate Agents,insurance Agents, Auto Companies, and more!",
        responsibilities: [
          "Worked on the distance based search,filter and sorting techniques",
          "Implemented the rating filter",
          "Handling the reported bugs",
        ],
        tags: ["Next JS", "NodeJS", "MongoDB", "Styled Components", "Ant D"],
        link: "https://pro.experience.com/",
      },
      {
        id: 3,
        title: "Security Centric Website",
        smalldesc: "Anytime, Anywhere access to hands-on security trainings.",
        desc: "Security Centric is a CyberSecurity Enablement company specializing  in Virtualization Education",
        images: [
          "/Security-Centric-1.webp",
          "/Security-Centric-2.webp",
          "/Security-Centric-2.webp",
        ],
        responsibilities: [
          "Build the project from scratch",
          "Handled complete UI side of the project",
          "Created a dashboard for admin for changing the contents in the websites ",
        ],
        tags: ["Vue JS", "Vuetify", "Composition API", "TypeScript", "Sass"],
        link: "http://www-dev.securitycentric.net/",
      },
      {
        id: 4,
        title: "BlueOcean",
        images: [
          "/blue-ocean-2.webp",
          "/blue-ocean-1.webp",
          "/blue-ocean-3.webp",
          "/blue-ocean-4.webp",
          "/blue-ocean-5.webp",
        ],
        smalldesc: "e-commerce website",
        desc: "Blue ocean is one of the largest suppliers of Lab equipments, Glassware and Plasticware throughout India.",
        responsibilities: [
          "Implement product order flow",
          "integrating RazorPay payment gateway integration",
          "Write RESTful API for CRUD operations for order and products",
          "API integrations",
        ],
        tags: ["Next JS", "NodeJS", "MongoDB", "Ant D"],
        link: "http://www.makethisblue.com",
      },
      {
        id: 5,
        title: "Security Centric CRM",
        images: ["/CRM-3.webp", "/CRM-2.webp", "/CRM-1.webp"],
        smalldesc: "Anytime, Anywhere access to hands-on security trainings.",
        desc: "Its a data entry platform for Security centric users to add,view and  edit their clients details",
        responsibilities: [
          "Build the project from scratch",
          "Handled complete UI side of the project",
          "Created the dashboard where user can view all his groups,other group members and his data entry as well",
          "Handled different user flows like Admin, Power User and Normal User",
        ],
        tags: ["Vue 3", "Quasar", "NodeJS", "MongoDB"],
        link: "http://crm-dev.securitycentric.net/",
      },
    ],
    []
  );

  const slugs = useMemo(
    () => [
      "javascript",
      "nodedotjs",
      "nextdotjs",
      "vuedotjs",
      "express",
      "vuetify",
      "quasar",
      "react",
      "typescript",
      "npm",
      "github",
      "gitlab",
      "mongodb",
      "html5",
      "css3",
      "sass",
      "vercel",
      "visualstudiocode",
      "antdesign",
      "jira",
      "tailwindcss",
      "graphql",
      "jest",
      "playwright",
    ],
    []
  );

  // Optimized parallax scroll with throttling using useCallback
  const handleParallaxScroll = useCallback(() => {
    const container = parallaxContainerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;

    // Disable all parallax transforms to prevent gaps between sections
    // Keep only opacity fade for hero section
    if (heroRef.current) {
      const heroProgress = Math.min(scrollTop / clientHeight, 1);
      const opacity = 1 - heroProgress * 0.3;

      heroRef.current.style.opacity = `${opacity}`;
      heroRef.current.style.transform = "none";
    }

    // Reset all transforms for other sections - no parallax movement
    [aboutRef, projectsRef, contactRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.transform = "none";
        ref.current.style.opacity = "1";
      }
    });
  }, []);

  // Advanced Parallax Scroll Effect with throttling
  useEffect(() => {
    const container = parallaxContainerRef.current;
    if (!container) return;

    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleParallaxScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", throttledHandler, { passive: true });
    throttledHandler(); // Initial call

    return () => container.removeEventListener("scroll", throttledHandler);
  }, [handleParallaxScroll]);

  // Smooth scroll handler for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");

        if (href) {
          const targetElement = document.querySelector(href);

          if (targetElement && parallaxContainerRef.current) {
            const container = parallaxContainerRef.current;
            const containerRect = container.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            const targetPosition =
              container.scrollTop + (targetRect.top - containerRect.top);

            container.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Initial hero animation - only run once with proper GSAP handling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadGsapAndAnimate = async () => {
      const { gsap } = await import("gsap");
      
      const heroTimeline = gsap.timeline({ delay: 0.2 });
      const circle = document.querySelector("#circle");
      const title = document.querySelector("#hero-title");
      const subtitle = document.querySelector("#hero-subtitle");
      const mouse = document.querySelector("#mouse");

      if (circle && title && subtitle) {
        heroTimeline
          .fromTo(circle, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
          .fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
          .fromTo(subtitle, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

        if (mouse && width && width > 967) {
          heroTimeline.fromTo(
            mouse,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
          );
        }
      }

      setHasAnimated((prev) => ({ ...prev, hero: true }));
    };

    loadGsapAndAnimate();
  }, [width]);

  // Scroll-triggered animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = async () => {
      const { gsap } = await import("gsap");
      const viewportHeight = window.innerHeight;

      // About section animation
      if (aboutRef.current && !hasAnimated.about) {
        const rect = aboutRef.current.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.7) {
          const tl = gsap.timeline({ delay: 0.2 });
          const elements = aboutRef.current.querySelectorAll("#aboutpara");
          const cloud = aboutRef.current.querySelector("#cloud");

          if (cloud) {
            tl.fromTo(
              cloud,
              { x: "-70%", opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7 }
            );
          }

          elements.forEach((element, index) => {
            tl.fromTo(
              element,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6 },
              `-=${index === 0 ? 0 : 0.4}`
            );
          });

          setHasAnimated((prev) => ({ ...prev, about: true }));
        }
      }

      // Projects section animation
      if (projectsRef.current && !hasAnimated.projects) {
        const rect = projectsRef.current.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.7) {
          const tl = gsap.timeline({ delay: 0.2 });
          const title = projectsRef.current.querySelector("h2");
          const projectCards =
            projectsRef.current.querySelectorAll("#project-card");

          if (title) {
            tl.fromTo(
              title,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 }
            );
          }

          projectCards.forEach((projectCard) => {
            tl.fromTo(
              projectCard,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 }
            );
          });

          setHasAnimated((prev) => ({ ...prev, projects: true }));
        }
      }

      // Contact section animation
      if (contactRef.current && !hasAnimated.contact) {
        const rect = contactRef.current.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.7) {
          const tl = gsap.timeline({ delay: 0.2 });
          const title = contactRef.current.querySelector("h3");
          const socialIcons = contactRef.current.querySelectorAll("#social-icon");

          if (title) {
            tl.fromTo(
              title,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 }
            );
          }

          socialIcons.forEach((socialIcon) => {
            tl.fromTo(
              socialIcon,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4 }
            );
          });

          setHasAnimated((prev) => ({ ...prev, contact: true }));
        }
      }
    };

    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [hasAnimated, width]);

  return (
    <>
      <Head>
        <title>Jishnu Pavithran - Full Stack Developer</title>
        <meta
          name="description"
          content="Frontend Software Engineer with 5+ years experience building scalable web applications with React, Vue, TypeScript, and Node.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Jishnu Pavithran - Full Stack Developer" />
        <meta
          property="og:description"
          content="Frontend Software Engineer specializing in React, Vue, and TypeScript"
        />
        <meta property="og:image" content="/linked-pic.png" />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.parallaxContainer} ref={parallaxContainerRef}>
        {/* Hero Section - Fixed */}
        <div className={styles.heroSection} ref={heroRef} id="home">
          <div className={styles.mainSection__rightCircle}>
            <div
              className={styles.mainSection__rightCircleImage}
              id="circle"
            >
              <Image
                src="/myself.webp"
                alt="Jishnu Pavithran"
                width={400}
                height={400}
                priority
              />
            </div>
          </div>
          <div className={styles.mainSection__container}>
            <div
              className={[
                styles.mainSection__left,
                "flex flex-col items-center",
              ].join(" ")}
            >
              <h1 className={styles.mainSection__title} id="hero-title">
                Jishnu Pavithran
              </h1>
              <p className={styles.mainSection__subtitle} id="hero-subtitle">
                A Full Stack Developer
              </p>
            </div>
            <div
              className={[
                styles.mainSection__right,
                " flex items-center",
              ].join(" ")}
            ></div>
            <a
              href="#about"
              className="scroll-down mouse effect1"
              id="mouse"
              aria-label="Scroll to about section"
              style={{ display: width && width > 967 ? "block" : "none" }}
            >
              <span></span>
            </a>
          </div>
        </div>

        {/* Stacked Sections Container */}
        <div className={styles.stackedSections}>
          {/* About Section */}
          <div
            className={[styles.aboutSection, styles.stackedSection].join(" ")}
            id="about"
            ref={aboutRef}
          >
            <div className={styles.aboutSectionContent}>
              <div className={styles.aboutSectionContentLeft}>
                <div className={styles.aboutHero} id="aboutpara">
                  <div className={styles.aboutHeroContent}>
                    <h2 className={styles.aboutHeroTitle}>
                      Transforming Ideas Into{" "}
                      <span className={styles.aboutHeroTitleAccent}>
                        Exceptional Digital Products
                      </span>
                    </h2>
                    <div className={styles.aboutHeroMeta}>
                      <div className={styles.aboutHeroMetaItem}>
                        <span className={styles.aboutHeroMetaValue}>
                          <span className={styles.aboutHeroMetaBadge}>
                            5+ Years
                          </span>{" "}
                          Building Scalable Web Apps
                        </span>
                      </div>
                      <div className={styles.aboutHeroMetaDivider}></div>
                      <div className={styles.aboutHeroMetaItem}>
                        <span className={styles.aboutHeroMetaValue}>
                          React • Vue • Node • TypeScript • GraphQL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.aboutMission} id="aboutpara">
                  <div className={styles.aboutMissionContent}>
                    <div className={styles.aboutMissionText}>
                      <div className={styles.aboutMissionHeader}>
                        <span className={styles.aboutMissionLabel}>
                          CURRENT MISSION:
                        </span>
                        <h3 className={styles.aboutMissionCompany}>
                          THOUGHTSPOT{" "}
                          <span
                            className={styles.aboutMissionIndicator}
                          ></span>
                        </h3>
                      </div>
                      <p className={styles.aboutMissionTagline}>
                        Architecting the future of search-driven analytics.
                      </p>
                    </div>
                    <div className={styles.aboutMissionVisual}>
                      <svg
                        viewBox="0 0 200 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.aboutMissionDashboard}
                        aria-hidden="true"
                      >
                        <rect
                          x="10"
                          y="10"
                          width="180"
                          height="140"
                          rx="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity="0.3"
                        />
                        <rect
                          x="10"
                          y="10"
                          width="180"
                          height="20"
                          rx="4"
                          fill="currentColor"
                          opacity="0.1"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="2"
                          fill="currentColor"
                          opacity="0.4"
                        />
                        <circle
                          cx="28"
                          cy="20"
                          r="2"
                          fill="currentColor"
                          opacity="0.4"
                        />
                        <circle
                          cx="36"
                          cy="20"
                          r="2"
                          fill="currentColor"
                          opacity="0.4"
                        />
                        <rect
                          x="20"
                          y="40"
                          width="75"
                          height="50"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        <polyline
                          points="25,75 35,65 45,70 55,55 65,60 75,50 85,55"
                          stroke="#9da284"
                          strokeWidth="2"
                          fill="none"
                          className={styles.chartLine}
                        />
                        <rect
                          x="105"
                          y="40"
                          width="75"
                          height="50"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        <rect
                          x="115"
                          y="70"
                          width="8"
                          height="15"
                          fill="currentColor"
                          opacity="0.4"
                          className={styles.chartBar}
                        />
                        <rect
                          x="128"
                          y="65"
                          width="8"
                          height="20"
                          fill="currentColor"
                          opacity="0.5"
                          className={styles.chartBar}
                        />
                        <rect
                          x="141"
                          y="60"
                          width="8"
                          height="25"
                          fill="#9da284"
                          opacity="0.8"
                          className={styles.chartBar}
                        />
                        <rect
                          x="154"
                          y="68"
                          width="8"
                          height="17"
                          fill="currentColor"
                          opacity="0.4"
                          className={styles.chartBar}
                        />
                        <rect
                          x="167"
                          y="72"
                          width="8"
                          height="13"
                          fill="currentColor"
                          opacity="0.3"
                          className={styles.chartBar}
                        />
                        <rect
                          x="20"
                          y="100"
                          width="75"
                          height="40"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        <circle
                          cx="57"
                          cy="120"
                          r="15"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray="30 65"
                          opacity="0.3"
                          fill="none"
                          transform="rotate(-90 57 120)"
                        />
                        <circle
                          cx="57"
                          cy="120"
                          r="15"
                          stroke="#9da284"
                          strokeWidth="8"
                          strokeDasharray="35 60"
                          opacity="0.7"
                          fill="none"
                          transform="rotate(20 57 120)"
                          className={styles.chartArc}
                        />
                        <rect
                          x="105"
                          y="100"
                          width="75"
                          height="40"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        <line
                          x1="110"
                          y1="108"
                          x2="175"
                          y2="108"
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.2"
                        />
                        <line
                          x1="110"
                          y1="115"
                          x2="175"
                          y2="115"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          opacity="0.15"
                        />
                        <line
                          x1="110"
                          y1="122"
                          x2="175"
                          y2="122"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          opacity="0.15"
                        />
                        <line
                          x1="110"
                          y1="129"
                          x2="175"
                          y2="129"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          opacity="0.15"
                        />
                        <line
                          x1="110"
                          y1="136"
                          x2="175"
                          y2="136"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          opacity="0.15"
                        />
                        <polyline
                          points="142,104 145,106 148,103 151,105 154,102 157,104"
                          stroke="#9da284"
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.6"
                          className={styles.sparkline}
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={styles.aboutDescription} id="aboutpara">
                  <p>
                    Frontend Software Engineer with a passion for crafting
                    engaging, user-centered digital experiences. Focused on
                    building scalable, maintainable, and interactive web
                    applications with a strong foundation in JavaScript, React,
                    and Vue. Bridging the gap between design and technology.
                  </p>
                </div>
              </div>
              <div className={styles.aboutSectionContentRight} id="cloud">
                <DynamicCloud iconSlugs={slugs} />
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div
            className={[styles.projectSection, styles.stackedSection].join(
              " "
            )}
            id="projects"
            ref={projectsRef}
          >
            <div className={styles.projectSectionContent}>
              <h2>Some Things I've Worked On </h2>
              <div className={styles.projectSectionContentOuter}>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    data={project}
                    state={null}
                    fullpage={null}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div
            className={[styles.contactSection, styles.stackedSection].join(
              " "
            )}
            id="contact"
            ref={contactRef}
          >
            <ContactMe />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
