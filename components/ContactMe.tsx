import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Styles from "../styles/contactme.module.scss";
import StylesFooter from "../styles/Footer.module.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TextLoop } from "./TextLoop";
import shuffle from "../utils/shuffle";
import weekday from "../utils/weekday";

// Lazy load ContactForm and Footer - they're below the fold
const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => <div style={{ height: '400px' }} />,
});
const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
});

// Memoize synonyms array outside component to prevent re-creation on each render
const SYNONYMS = [
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

function ContactMe() {
  const [hasMounted, setHasMounted] = useState(false);
  
  // Only shuffle on client to avoid hydration mismatch
  const shuffledSynonyms = useMemo(() => {
    if (!hasMounted) return SYNONYMS; // Use original order on server
    return shuffle(SYNONYMS);
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prependArticle = (word: string) => {
    const vowels = "aeiou";
    const firstLetter = word[0].toLowerCase();
    if (vowels.indexOf(firstLetter) > -1) return <span>an {word} </span>;
    return <span>a {word} </span>;
  };

  return (
    <div className={Styles.contactMeInner}>
      <h3>Get in Touch</h3>
      <div className={Styles.contactMeInnerGreeting}>
        <div className={Styles.contactMeInnerGreetingMain}>
          Let&apos;s create something{" "}
          <TextLoop>
            {shuffledSynonyms.map((synonym: string, index: number) => {
              return <span key={index}>{synonym}</span>;
            })}
          </TextLoop>
        </div>
        <div className={Styles.contactMeInnerGreetingSubtext}>
          Hope your {weekday()} is going well
        </div>
      </div>
      <div className={Styles.contactMeInnerLeft}>
        {/* <a className={Styles.contactMeInnerAddress}>
          <div
            className={`${StylesFooter.footer__iconWrapper} ${StylesFooter.footer__facebook}`}
          >
            <span className="icon-facebook">
              <FaMapMarkerAlt />
            </span>
          </div>
          Thalassery, Kerala
        </a>

        <a className={Styles.contactMeInnerPhone}>
          <div
            className={`${StylesFooter.footer__iconWrapper} ${StylesFooter.footer__facebook}`}
          >
            <span className="icon-facebook">
              <FaMapMarkerAlt />
            </span>
          </div>
          7012532364
        </a>

        <a className={Styles.contactMeInnerEmail}>
          <div
            className={`${StylesFooter.footer__iconWrapper} ${StylesFooter.footer__facebook}`}
          >
            <span className="icon-facebook">
              <FaMapMarkerAlt />
            </span>
          </div>
          jishnupavithran007@gmail.com
        </a> */}
      </div>
      <div className={Styles.contactMeInnerRight}>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}

export default ContactMe;
