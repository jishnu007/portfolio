import React from "react";
import styles from "../styles/Home.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";

function home() {
  return (
    <ReactFullpage
      navigation={false}
      showActiveTooltip={false}
      slidesNavigation={false}
      cards={true}
      licenseKey="YOUR_KEY_HERE"
      render={(comp) => (
        <ReactFullpage.Wrapper>
          <div
            className={[styles.section, styles.firstSec, "section"].join(" ")}
          >
            Hello 1
          </div>
          <div
            className={[styles.section, styles.secondSec, "section"].join(" ")}
          >
            Hello 2
          </div>
          <div
            className={[styles.section, styles.thirdSec, "section"].join(" ")}
          >
            Hello 3
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  );
}

export default home;
