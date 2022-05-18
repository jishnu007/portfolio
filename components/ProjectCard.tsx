/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Styles from "../styles/Projectcard.module.scss";
import { Drawer, Button, Carousel } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeftThinCircleOutline } from "@mdi/js";
import useWindowDimensions from "../utils/useWindowDimensions";

type Project = {
  id: number;
  title: string;
  images: string[];
  smalldesc: String;
  desc: string;
  responsibilities: string[];
  tags: string[];
  link: string;
};
const ProjectCard = (props: { data: Project; state: any; fullpage: any }) => {
  const { height, width }: any = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
    console.log(props.state, "helooo...", props.fullpage);
    if (width < 968) return;
    // props.fullpage.destroy();
    props.fullpage.setLockAnchors(true);
    props.fullpage.setAllowScrolling(false);
    props.fullpage.setKeyboardScrolling(false);

    // const bodyElement = document.querySelector("body");
    // if (bodyElement) {
    //   bodyElement.style.overflow = "scroll";
    // }
  };
  const onClose = () => {
    setVisible(false);
    if (width < 968) return;
    props.fullpage.setLockAnchors(false);
    // props.fullpage.reBuild();
    props.fullpage.setAllowScrolling(true);
    props.fullpage.setKeyboardScrolling(true);

    // const bodyElement = document.querySelector("body");
    // if (bodyElement) {
    //   bodyElement.style.overflow = "visible";
    // }
  };
  const contentStyle: any = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <>
      <div
        className={Styles.projectCard}
        onClick={showDrawer}
        id="project-card"
      >
        <img src={props.data.images[0]} alt={props.data.images[0]} />
        <div className={Styles.cardOverlay}>
          <h3>{props.data.title}</h3>
          <div className={Styles.tags}>
            {props.data.tags.map((tag: any, index: number) => {
              return (
                <div className={Styles.tag} key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Drawer
        title="Back to Projects"
        placement="right"
        onClose={onClose}
        closable={true}
        width={width && width > 968 ? "35%" : "100%"}
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
        <div className={Styles.projectDrawer}>
          <div className={Styles.projectDrawerContent}>
            <h3>{props.data.title}</h3>
            <p>{props.data.smalldesc}</p>
            <Carousel autoplay>
              {props.data.images.map((image: string, index: number) => (
                <div key={index}>
                  <img src={image} alt={image} />
                  {/* <h3 style={contentStyle}>1</h3> */}
                </div>
              ))}
            </Carousel>
            <h4>About</h4>
            <p>{props.data.desc}</p>
            <h4>What I Have Done</h4>
            <ul className="resps">
              {props.data.responsibilities &&
                props.data.responsibilities.map(
                  (responsibility: any, index: number) => {
                    return <li key={index}>{responsibility}</li>;
                  }
                )}
            </ul>
            <h4>Technologies</h4>
            <div className={Styles.tags}>
              {props.data.tags.map((tag: any, index: number) => {
                return (
                  <div className={Styles.tag} key={index}>
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <a
            href={props.data.link}
            target="_blank"
            rel="noreferrer"
            className={Styles.projectLink}
          >
            Open Project
          </a>
        </div>
      </Drawer>
    </>
  );
};
export default ProjectCard;
