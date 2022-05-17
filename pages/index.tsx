/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.scss";
import StarterImage from "../components/StarterImage";
import TextLoop from "react-text-loop";
import weekday from "../utils/weekday";
import shuffle from "../utils/shuffle";
import { gsap } from "gsap";
import GlitchedWriter from "glitched-writer";
// import * from 'scrambling-letters'
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
  const [scramblingText, setScramblingText] = useState(shuffledSynonyms[0]);
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
      title: "Utilizecore",
      images: [
        "/UtilizeCore-1.png",
        "/UtilizeCore-2.png",
        "/UtilizeCore-3.png",
      ],
      smalldesc:
        "An organized workforce will help service management companies achieve new levels of productivity.",
      desc: "Utilizecore is service managment platform which help Businesses manage thier subcontractor network, clients and locations being serviced more efficiently.",
      responsibilities: [
        "Worked as a part of agile team for transforming the legacy code which was written in ROR to the VueJs and make the UI more functional",
        "Have worked on transforming the design which was provided by the designer to life",
        "Have worked on different modules like workorders,invoices,timetracker etc..",
        "Have integrated chargebee payment gateway",
        "Have worked on login/registeration flow pages",
      ],
      tags: ["Vue JS", "Vuetify", "Composition API", "TypeScript", "Sass"],
    },
    {
      id: 1,
      title: "Experience",
      images: ["/experianceHome.png", "/experianceInner.png"],
      smalldesc: "An Experience Management Platform",
      desc: "Customer Experience rating and search site for Mortgage, Brokers, Loan officers,Real Estate Agents,insurance Agents, Auto Companies, and more!",
      responsibilities: [
        "Worked on the distance based search,filter and sorting techniques",
        "Implemented the rating filter",
        "Handling the reported bugs",
      ],
      tags: ["Next JS", "NodeJS", "MongoDB", "Styled Components", "Ant D"],
    },
    {
      id: 2,
      title: "Security Centric Website",
      smalldesc: "Anytime, Anywhere access to hands-on security trainings.",
      desc: "Security Centric is a CyberSecurity Enablement company specializing  in Virtualization Education",
      images: [
        "/Security-Centric-1.png",
        "/Security-Centric-2.png",
        "/Security-Centric-2.png",
      ],
      tags: ["Vue JS", "Vuetify", "Composition API", "TypeScript", "Sass"],
      link: "http://www-dev.securitycentric.net/",
    },
    {
      id: 3,
      title: "BlueOcean",
      images: ["/blue-ocean-1.png", "/blue-ocean-1.png", "/blue-ocean-1.png"],
      smalldesc: "e-commerce website",
      desc: "Blue ocean is one of the largest suppliers of Lab equipments, Glassware and Plasticware throughout India.",
      responsibilities: [
        "Implement product order flow",
        "integrating RazorPay payment gateway integration",
        "Write RESTful API for CRUD operations for order and products",
        "API integrations",
      ],
      tags: ["Next JS", "NodeJS", "MongoDB", "Ant D"],
      link: "makethisblue.com",
    },
    {
      id: 4,
      title: "Security Centric CRM",
      images: ["/CRM-3.png", "/CRM-2.png", "/CRM-1.png"],
      desc: "sample desc",
      tags: ["Vue 3", "Quasar", "NodeJS", "MongoDB"],
      link: "http://crm-dev.securitycentric.net/",
    },
  ];
  const handleAfterLoad = (
    origin: any,
    destination: any,
    direction: any,
    trigger: any
  ) => {
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
    "c++",
    "mongodb",
    "html5",
    "css3",
    "scss",
    "sass",
    "vercel",
    "visualstudiocode",
    "antdesign",
    "jira",
    "tailwindcss",
  ];

  // const element = document.getElementById("scrambling-text");
  // const writer = new GlitchedWriter(element, {
  //   interval: [10, 70],
  //   oneAtATime: true,
  //   letterize: true,
  // });
  // useEffect(() => {
  //   const tl5 = gsap.to(".scrambling-text", {
  //     scrambleText: {
  //       text: scramblingText,
  //       tweenLength: false,
  //       speed: 1,
  //       revealDelay: 2.5,
  //       chars: "lowercase",
  //       newClass: "after",
  //     },
  //     duration: 5,
  //     ease: "none",
  //   });
  // }, [scramblingText]);
  // const MINUTE_MS = 2500;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const tl5 = gsap.to(".scrambling-text", {
  //       scrambleText: {
  //         text: "abc",
  //         tweenLength: false,
  //         speed: 1,
  //         revealDelay: 2.5,
  //         chars: "lowercase",
  //         newClass: "after",
  //       },
  //       duration: 5,
  //       ease: "none",
  //     });
  //   }, MINUTE_MS);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, []);

  return (
    <>
      <Head>
        <title>Jishnu Pavithran</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className={styles.main}> */}
      <ReactFullpage
        navigation={false}
        licenseKey={"FSq:Ya'$hK3%S.BsJ('sa"}
        afterLoad={(origin: any, destination: any, direction: any) => {
          const section = destination.item;
          let tl: any = gsap.timeline({ delay: width > 967 ? 0.4 : 0 });
          if (destination.index == 0 && direction == null) {
            const title = section.querySelector("h2");
            const subTitle = section.querySelector("p");
            const circle = section.querySelector("#circle");
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
          }
          handleAfterLoad;
        }}
        easing="easeInOutCubic"
        easingcss3="ease"
        fadingEffect={true}
        fitToSection={false}
        anchors={["home", "about", "projects", "contact"]}
        responsiveWidth={967}
        // lockAnchors={true}
        loopBottom={false}
        loopTop={false}
        // beforeLeave={(origin: any, destination: any, direction: any) => {
        //   console.log("in bofore leave..............");
        // }}
        onLeave={(origin, destination, direction) => {
          const section = destination.item;
          console.log(destination, "dest", section);
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
            const textTl = gsap.timeline({
              defaults: { ease: "SlowMo.easeOut", delay: 0.7 },
            });
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
              { y: "50", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            projectCards.forEach((projectCard: any) => {
              tx.fromTo(
                projectCard,
                0.4,
                { y: "50", opacity: 0 },
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
              { y: "50", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            socailIcons.forEach((socailIcon: any) => {
              tl.fromTo(
                socailIcon,
                0.4,
                { y: "50", opacity: 0 },
                { y: 0, opacity: 1 }
              );
            });
          }
        }}
        // normalScrollElements={".aboutsection"}
        // scrollOverflow={true}
        render={({ state, fullpageApi }) => (
          <ReactFullpage.Wrapper>
            <div
              className={[styles.mainSection, "section"].join(" ")}
              data-anchor=""
            >
              <div className={styles.mainSection__rightCircle}>
                <div
                  className={styles.mainSection__rightCircleImage}
                  id="circle"
                >
                  <img src="/myself.png" alt="bg" />
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
                    👋 Hi, I'm <span>Jishnu</span>
                  </p>
                  <p id="aboutpara">
                    I'm a{" "}
                    <span>Full Stack Web Developer / Software Engineer</span>. I
                    Love creating
                    <span> interactive digital experiences</span> on the web as
                    well as making it dynamic by{" "}
                    <span>robust web architecture</span>.I enjoy solving
                    problems and working with <span>JavaScript</span> and its
                    hip frameworks like React ,Vue
                  </p>{" "}
                  <p id="aboutpara">
                    {" "}
                    I've worked with and for <span>startups</span> like
                    Rayabhari and Sweans,helped companies like{" "}
                    <span>Experience, UtilizeCore</span> and{" "}
                    <span>SecurityCentric</span> by providing{" "}
                    <span>cutting edge</span> web experiences and technology
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

// if (destination.index == 0) {
//   const title = section.querySelector("h2");
//   const subTitle = section.querySelector("p");
//   const circle = section.querySelector("#circle");
//   tl.fromTo(
//     circle,
//     0.5,
//     { y: "50", opacity: 0 },
//     { y: 0, opacity: 1 }
//   );
//   tl.fromTo(
//     title,
//     0.5,
//     { y: "50", opacity: 0 },
//     { y: 0, opacity: 1 }
//   );
//   tl.fromTo(
//     subTitle,
//     0.6,
//     { y: "50", opacity: 0 },
//     { y: 0, opacity: 1 }
//   );
// }
