// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react/no-unescaped-entities */
"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { TextLoop } from "@pr0gramm/react-text-loop";
import weekday from "../utils/weekday";
import shuffle from "../utils/shuffle";
import { gsap } from "gsap";
import ProjectCard from "../components/ProjectCard";
import ContactMe from "../components/ContactMe";
import ReactFullpage from "@fullpage/react-fullpage";
import { DynamicCloud } from "../utils/dynamic-cloud";
import useWindowDimensions from "../utils/useWindowDimensions";

const Home: NextPage = () => {
  const synonyms: string[] = [
    "ace",
    "amazing",
    "astonishing",
    "astounding",
    "awe-inspiring",
    "awesome",
    "beautiful",
    "bedazzling",
    "best",
    "breathtaking",
    "brilliant",
    "classy",
    "cool",
    "dandy",
    "dazzling",
    "delightful",
    "divine",
    "doozie",
    "epic",
    "excellent",
    "exceptional",
    "exquisite",
    "extraordinary",
    "fabulous",
    "fantastic",
    "fantabulous",
    "fine",
    "finest",
    "first-class",
    "first-rate",
    "flawless",
    "funkadelic",
    "geometric",
    "glorious",
    "gnarly",
    "good",
    "grand",
    "great",
    "groovy",
    "groundbreaking",
    "hunky-dory",
    "impeccable",
    "impressive",
    "incredible",
    "kickass",
    "laudable",
    "legendary",
    "lovely",
    "luminous",
    "magnificent",
    "majestic",
    "marvelous",
    "mathematical",
    "mind-blowing",
    "neat",
    "outstanding",
    "peachy",
    "perfect",
    "phenomenal",
    "pioneering",
    "polished",
    "posh",
    "praiseworthy",
    "premium",
    "priceless",
    "prime",
    "primo",
    "rad",
    "remarkable",
    "riveting",
    "sensational",
    "shining",
    "slick",
    "smashing",
    "solid",
    "spectacular",
    "splendid",
    "stellar",
    "striking",
    "stunning",
    "stupendous",
    "stylish",
    "sublime",
    "super",
    "super-duper",
    "super-excellent",
    "superb",
    "superior",
    "supreme",
    "sweet",
    "swell",
    "terrific",
    "tiptop",
    "top-notch",
    "transcendent",
    "tremendous",
    "ultimate",
    "unreal",
    "well-made",
    "wicked",
    "wonderful",
    "wondrous",
    "world-class",
  ];
  const { height, width }: any = useWindowDimensions();

  const shuffledSynonyms = shuffle(synonyms);
  const [aboutAnimationCounter, setAboutAnimationCounter] = useState(0);
  const [projectAnimationCounter, setProjectAnimationCounter] = useState(0);
  const [contactAnimationCounter, setContactAnimationCounter] = useState(0);

  const prependArticle = (word: string) => {
    var vowels = "aeiou";
    var firstLetter = word[0].toLowerCase();
    if (vowels.indexOf(firstLetter) > -1) return <span>an {word} </span>;
    else return <span>a {word} </span>;
  };

  const projects = [
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
      // smalldesc:
      //   "An organized workforce will help service management companies achieve new levels of productivity.",
      desc: "Utilizecore is service managment platform which help Businesses manage thier subcontractor network, clients and locations being serviced more efficiently.",
      responsibilities: [
        "Worked as a part of agile team for transforming the legacy code which was written in ROR to the VueJs and make the UI more functional",
        "Have worked on transforming the design which was provided by the designer to life",
        "Have worked on different modules like workorders,invoices,timetracker etc..",
        // "Have integrated chargebee payment gateway",
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
  ];
  const handleAfterLoad = () => {
    const element = document.querySelectorAll(
      ".fp-section.active .aos-init"
    )[0];
    if (element) {
      element.className = "aos-init aos-animate";
    }
  };
  const slugs = [
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
  ];

  return (
    <>
      <Head>
        <title>Jishnu Pavithran</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/linked-pic.png" />
      </Head>
      <ReactFullpage
        navigation={false}
        licenseKey={"FSq:Ya'$hK3%S.BsJ('sa"}
        scrollingSpeed={1100}
        credits={{
          enabled: false,
        }}
        afterLoad={(origin: any, destination: any, direction: any) => {
          handleAfterLoad;
          const section = destination.item;
          let tl: any = gsap.timeline({ delay: width > 967 ? 0.4 : 0 });
          if (destination.index == 0 && direction == null) {
            const title = section.querySelector("h2");
            const subTitle = section.querySelector("p");
            const circle = section.querySelector("#circle");
            const mouse = section.querySelector("#mouse");
            tl.fromTo(
              circle,
              0.5,
              { y: "50", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            tl.fromTo(
              title,
              0.5,
              { y: "50", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            tl.fromTo(
              subTitle,
              0.6,
              { y: "50", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            tl.fromTo(
              mouse,
              0.6,
              { y: "50", opacity: 0 },
              { y: 0, opacity: 1 }
            );
          }
        }}
        easing="easeInOutCubic"
        easingcss3="ease"
        fadingEffect={true}
        fitToSection={false}
        anchors={["home", "about", "projects", "contact"]}
        responsiveWidth={967}
        loopBottom={false}
        loopTop={false}
        onLeave={(origin, destination, direction) => {
          const section = destination.item;
          const tl: any = gsap.timeline({ delay: width > 967 ? 0.4 : 0 });
          if (
            destination.index == 1 &&
            direction == "down" &&
            aboutAnimationCounter < 1 &&
            width > 967
          ) {
            setAboutAnimationCounter(aboutAnimationCounter + 1);
            const elements = section.querySelectorAll("#aboutpara");
            const cloud = section.querySelector("#cloud");
            tl.fromTo(
              cloud,
              0.7,
              { x: "-70%", opacity: 0 },
              { x: 0, opacity: 1 }
            );
            elements.forEach((element) => {
              tl.fromTo(
                element,
                0.5,
                { y: "50", opacity: 0 },
                { y: 0, opacity: 1 }
              );
            });
          }
          if (
            destination.index == 2 &&
            direction == "down" &&
            projectAnimationCounter < 1 &&
            width > 967
          ) {
            setProjectAnimationCounter(projectAnimationCounter + 1);
            const title = section.querySelector("h2");
            const projectCards = section.querySelectorAll("#project-card");
            const tx: any = gsap.timeline({ delay: 0.4 });
            tl.fromTo(
              title,
              0.5,
              { y: "30", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            projectCards.forEach((projectCard: any) => {
              tx.fromTo(
                projectCard,
                0.5,
                { y: "30", opacity: 0 },
                { y: 0, opacity: 1 }
              );
            });
          }
          if (
            destination.index == 3 &&
            direction == "down" &&
            contactAnimationCounter < 1 &&
            width > 967
          ) {
            setContactAnimationCounter(contactAnimationCounter + 1);
            const title = section.querySelector("h3");
            const socailIcons = section.querySelectorAll("#social-icon");
            tl.fromTo(
              title,
              0.5,
              { y: "30", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            socailIcons.forEach((socailIcon: any) => {
              tl.fromTo(
                socailIcon,
                0.4,
                { y: "20", opacity: 0 },
                { y: 0, opacity: 1 }
              );
            });
          }
        }}
        render={({ state, fullpageApi }) => (
          <ReactFullpage.Wrapper>
            <div className={[styles.mainSection, "section"].join(" ")}>
              <div className={styles.mainSection__rightCircle}>
                <div
                  className={styles.mainSection__rightCircleImage}
                  id="circle"
                >
                  <img src="/myself.webp" alt="bg" />
                </div>
              </div>
              <div className={styles.mainSection__container}>
                <div
                  className={[
                    styles.mainSection__left,
                    "flex flex-col items-center",
                  ].join(" ")}
                >
                  <h2 className={styles.mainSection__title}>
                    Jishnu Pavithran
                  </h2>
                  <p className={styles.mainSection__subtitle}>
                    A Full Stack Developer
                  </p>
                </div>
                <div
                  className={[
                    styles.mainSection__right,
                    " flex items-center",
                  ].join(" ")}
                >
                  {/* <StarterImage /> */}
                </div>
                {width > 967 && (
                  <a
                    href="#about"
                    className="scroll-down mouse effect1"
                    id="mouse"
                  >
                    <span></span>
                  </a>
                )}
              </div>
            </div>
            <div
              className={[styles.aboutSection, "aboutsection section"].join(
                " "
              )}
              data-anchor="about"
            >
              <div className={styles.aboutSectionContent}>
                <div className={styles.aboutSectionContentLeft}>
                  <p id="aboutpara">
                    👋 Hi, I&apos;m <span>Jishnu</span>
                  </p>
                  <p id="aboutpara">
                    I&apos;m a <span>Frontend Software Engineer</span> with a
                    passion for crafting engaging, <span>user-centered</span>{" "}
                    digital experiences. With a focus on building{" "}
                    <span>scalable</span>, <span>maintainable</span>, and
                    <span> interactive</span> web applications, I enjoy solving
                    problems and bringing ideas to life. With a strong
                    foundation in <span>JavaScript</span> and frameworks like{" "}
                    <span>React</span> and <span>Vue</span>, I work to bridge
                    the gap between <span>design</span> and{" "}
                    <span>technology</span>.
                  </p>
                  <p id="aboutpara">
                    I have over <span>4 years of experience</span> in the
                    industry. Currently, I&apos;m part of a talented team at{" "}
                    <span>ThoughtSpot</span>, where we develop{" "}
                    <span>innovative products</span> and <span>features</span>{" "}
                    around
                    <span> search-driven analytics</span>. Previously, I&apos;ve
                    worked with and for <span>startups</span> like Rayabhari and
                    Sweans, and have contributed to projects for companies such
                    as <span>Experience.com</span>, <span>UtilizeCore</span>,
                    and <span>SecurityCentric</span> by delivering{" "}
                    <span>cutting-edge</span> web experiences and{" "}
                    <span>technology solutions</span>.
                  </p>
                  {/* <p>Learning Web3</p> */}
                  <p id="aboutpara">
                    If you fancy a chat feel free to{" "}
                    <span className={styles.aboutSectionHoverable}>
                      drop me a line.
                    </span>
                  </p>
                  <div className={styles.aboutSectionLastPara} id="aboutpara">
                    <span>
                      {" "}
                      Stay bold & <br />
                      Have{" "}
                    </span>
                    <TextLoop>
                      {shuffledSynonyms.map(
                        (synonym: string, index: number) => {
                          return (
                            <span key={index}>{prependArticle(synonym)}</span>
                          );
                        }
                      )}
                    </TextLoop>{" "}
                    <span>{weekday()}</span>
                  </div>
                </div>
                <div className={styles.aboutSectionContentRight} id="cloud">
                  <DynamicCloud iconSlugs={slugs} />
                </div>
              </div>
            </div>
            <div
              className={[styles.projectSection, "section"].join(" ")}
              data-anchor="projects"
            >
              <div className={styles.projectSectionContent}>
                <h2>Some Things I’ve Worked On </h2>
                <div
                  className={styles.projectSectionContentOuter}
                  id="project-card"
                >
                  {projects.map((project: any, index: number) => {
                    return (
                      <ProjectCard
                        key={index}
                        data={project}
                        state={state}
                        fullpage={fullpageApi}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className={[styles.contactSection, "section"].join(" ")}
              data-anchor="contact"
            >
              <ContactMe />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </>
  );
};

export default Home;

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import type { NextPage } from "next";
// import Head from "next/head";
// import { useState } from "react";
// import styles from "../styles/Home.module.scss";
// import TextLoop from "react-text-loop";
// import weekday from "../utils/weekday";
// import shuffle from "../utils/shuffle";
// import { gsap } from "gsap";
// import ProjectCard from "../components/ProjectCard";
// import ContactMe from "../components/ContactMe";
// import ReactFullpage from "@fullpage/react-fullpage";
// import useWindowDimensions from "../utils/useWindowDimensions";

// const Home: NextPage = () => {
//   const synonyms = ["ace", "amazing", "astonishing", "awesome", "beautiful", ...];
//   const { height, width } = useWindowDimensions();
//   const shuffledSynonyms = shuffle(synonyms);

//   const [aboutAnimationCounter, setAboutAnimationCounter] = useState(0);
//   const [projectAnimationCounter, setProjectAnimationCounter] = useState(0);
//   const [contactAnimationCounter, setContactAnimationCounter] = useState(0);

//   const prependArticle = (word: string) => {
//     const vowels = "aeiou";
//     return vowels.includes(word[0].toLowerCase()) ? `an ${word}` : `a ${word}`;
//   };

//   const projects = [
//     {
//       id: 0,
//       title: "Utilizecore",
//       images: ["/UtilizeCore-1.webp", "/UtilizeCore-2.webp"],
//       smalldesc: "A game-changing platform for service management.",
//       desc: "A platform for managing subcontractor networks, clients, and locations.",
//       responsibilities: [
//         "Transformed legacy code from ROR to Vue.js",
//         "Developed UI components based on design",
//         "Worked on modules like work orders, invoices, etc.",
//       ],
//       tags: ["Vue JS", "Vuetify", "TypeScript"],
//       link: "https://utilizecore.com/",
//     },
//     // Other projects...
//   ];

//   const handleAfterLoad = () => {
//     const element = document.querySelector(".fp-section.active .aos-init");
//     if (element) {
//       element.classList.add("aos-animate");
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Jishnu Pavithran</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//         <meta property="og:image" content="/linked-pic.png" />
//       </Head>

//       <ReactFullpage
//         navigation={false}
//         licenseKey={"FSq:Ya'$hK3%S.BsJ('sa"}
//         scrollingSpeed={1100}
//         afterLoad={handleAfterLoad}
//         fitToSection={false}
//         anchors={["home", "about", "projects", "contact"]}
//         render={({ state, fullpageApi }) => (
//           <ReactFullpage.Wrapper>
//             <section className={`${styles.mainSection} section`}>
//               <div className={styles.mainSection__container}>
//                 <h2>Jishnu Pavithran</h2>
//                 <p>A Full Stack Developer</p>
//                 {width > 967 && (
//                   <a href="#about" className="scroll-down" id="mouse">
//                     <span></span>
//                   </a>
//                 )}
//               </div>
//             </section>

//             <section className={`${styles.aboutSection} section`} data-anchor="about">
//               <div className={styles.aboutSectionContent}>
//                 <div className={styles.aboutSectionContentLeft}>
//                   <p>
//                     👋 Hi, I'm <span>Jishnu</span>. I'm a <span>Full Stack Developer</span>.
//                   </p>
//                   <p>
//                     I enjoy building <span>interactive digital experiences</span> using{" "}
//                     <span>JavaScript</span> and frameworks like <span>React</span> and <span>Vue</span>.
//                   </p>
//                   <p>
//                     Worked with companies like <span>Experience</span>, <span>UtilizeCore</span>, and <span>SecurityCentric</span>.
//                   </p>
//                   <p>
//                     <TextLoop>
//                       {shuffledSynonyms.map((synonym, index) => (
//                         <span key={index}>{prependArticle(synonym)}</span>
//                       ))}
//                     </TextLoop>{" "}
//                     <span>{weekday()}</span>
//                   </p>
//                 </div>
//                 {/* Right Section */}
//               </div>
//             </section>

//             <section className={`${styles.projectSection} section`} data-anchor="projects">
//               <h2>Some Things I’ve Worked On</h2>
//               <div className={styles.projectSectionContentOuter}>
//                 {projects.map((project, index) => (
//                   <ProjectCard key={index} data={project} />
//                 ))}
//               </div>
//             </section>

//             <section className={`${styles.contactSection} section`} data-anchor="contact">
//               <ContactMe />
//             </section>
//           </ReactFullpage.Wrapper>
//         )}
//       />
//     </>
//   );
// };

// export default Home;
