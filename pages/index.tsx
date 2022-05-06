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
import { randomInt } from "crypto";
import { lookup } from "dns";
import ProjectCard from "../components/ProjectCard";
import ContactMe from "../components/ContactMe";
import ReactFullpage from "@fullpage/react-fullpage";
import bgChanger from "../utils/bgChanger";

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

  const shuffledSynonyms = shuffle(synonyms);
  const [scramblingText, setScramblingText] = useState(shuffledSynonyms[0]);
  const prependArticle = (word: string) => {
    var vowels = "aeiou";
    var firstLetter = word[0].toLowerCase();
    if (vowels.indexOf(firstLetter) > -1) return "an " + word;
    else return "a " + word;
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
      desc: "sample desc",
      tags: ["Vue JS", "Vuetify", "Composition API", "TypeScript", "Sass"],
    },
    {
      id: 1,
      title: "Experience",
      images: ["/experianceHome.png", "/experianceInner.png"],
      desc: "sample desc",
      tags: ["Next JS", "NodeJS", "MongoDB", "Styled Components", "Ant D"],
    },
    {
      id: 2,
      title: "Security Centric",

      images: [
        "/Security-Centric-1.png",
        "/Security-Centric-2.png",
        "/Security-Centric-2.png",
      ],
      desc: "sample desc",
      tags: ["Vue JS", "Vuetify", "Composition API", "TypeScript", "Sass"],
    },
    {
      id: 3,
      title: "BlueOcean",
      images: ["/blue-ocean-1.png", "/blue-ocean-1.png", "/blue-ocean-1.png"],
      desc: "sample desc",
      tags: ["Next JS", "NodeJS", "MongoDB", "Styled Components", "Ant D"],
    },
    {
      id: 4,
      title: "Security Centric",
      images: ["/blue-ocean-1.png", "/blue-ocean-1.png", "/blue-ocean-1.png"],
      desc: "sample desc",
      tags: ["Next JS", "NodeJS", "MongoDB", "Styled Components", "Ant D"],
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
        afterLoad={handleAfterLoad}
        easing="easeInOutCubic"
        easingcss3="ease"
        fadingEffect={true}
        fitToSection={false}
        anchors={["home", "about", "projects", "contact"]}
        responsiveWidth={967}
        // normalScrollElements={".aboutsection"}
        // scrollOverflow={true}
        render={(comp) => (
          <ReactFullpage.Wrapper>
            <div
              className={[styles.mainSection, "section"].join(" ")}
              data-anchor=""
            >
              <div className={styles.mainSection__rightCircle}>
                <div className={styles.mainSection__rightCircleImage}>
                  <img src="removed-bg-1.png" alt="bg" />
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
              <div className=" d-flex p-12 ">
                <p>
                  👋 Hi, I'm <span>Jishnu</span>
                </p>
                <p>
                  I'm a{" "}
                  <span>Full Stack Web Developer / Software Engineer</span> from{" "}
                  <span>kerala</span> Who is passionate about creating
                  <span> interactive digital experiences</span> on the web as
                  well as making it dynamic by{" "}
                  <span>robust web architecture</span>.I love solving problems
                  and working with <span> React, Vue</span> and other hip
                  frameworks
                </p>{" "}
                <p>
                  {" "}
                  I've worked with and for <span>startups</span> like Rayabhari
                  and Sweans,helped companies like{" "}
                  <span>Experience, UtilizeCore</span> and{" "}
                  <span>SecurityCentric</span> by providing{" "}
                  <span>cutting edge</span> web experiences and technology
                </p>
                {/* <p>
                  I have <span>2 year</span> experience as a{" "}
                  <span>developer</span> and love solving problems and working
                  with React and other hip frameworks
                </p> */}
                <p>
                  If you fancy a chat feel free to{" "}
                  <span className={styles.aboutSectionHoverable}>
                    drop me a line.
                  </span>
                </p>
                <p>
                  <span>
                    {" "}
                    Stay bold & <br />
                    Have{" "}
                    <span
                      className="scrambling-text"
                      id="scrambling-text"
                    ></span>
                    <TextLoop>
                      {shuffledSynonyms.map(
                        (synonym: string, index: number) => {
                          return (
                            <span key={index}> {prependArticle(synonym)}</span>
                          );
                        }
                      )}
                    </TextLoop>{" "}
                    {weekday()}
                  </span>
                </p>
              </div>
            </div>
            <div
              className={[styles.projectSection, "section"].join(" ")}
              data-anchor="projects"
            >
              <div className={styles.projectSectionInner}>
                <h2 data-aos="fade-up">Stuff I’ve worked on 📁</h2>
                <ul>
                  {projects.map((project: any, index: number) => {
                    return (
                      <li key={index}>
                        <ProjectCard
                          title={project.title}
                          description={project.desc}
                          tags={project.tags}
                          images={project.images}
                        />
                      </li>
                    );
                  })}
                </ul>
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
function randomFromArray(chars: string[]): any {
  throw new Error("Function not implemented.");
}
