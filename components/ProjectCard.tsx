"use client";
import { useState } from "react";
import Styles from "../styles/Projectcard.module.scss";
import { Drawer, Carousel } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeftThinCircleOutline } from "@mdi/js";
import useWindowDimensions from "../utils/useWindowDimensions";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  images: string[];
  smalldesc: string;
  desc: string;
  responsibilities: string[];
  tags: string[];
  link: string;
};

type ProjectCardProps = {
  data: Project;
  state: any;
  fullpage: any;
};

const ProjectCard = ({ data, state, fullpage }: ProjectCardProps) => {
  const { width } = useWindowDimensions() as { width: number };
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
    if (width >= 968) {
      fullpage.setLockAnchors(true);
      fullpage.setAllowScrolling(false);
      fullpage.setKeyboardScrolling(false);
    }
  };

  const onClose = () => {
    setVisible(false);
    if (width >= 968) {
      fullpage.setLockAnchors(false);
      fullpage.setAllowScrolling(true);
      fullpage.setKeyboardScrolling(true);
    }
  };

  return (
    <>
      <div
        className={Styles.projectCard}
        onClick={showDrawer}
        id="project-card"
      >
        <Image src={data.images[0]} alt={data.title} layout="fill" />
        <div className={Styles.cardOverlay}>
          <h3>{data.title}</h3>
          <div className={Styles.tags}>
            {data.tags.map((tag, index) => (
              <div className={Styles.tag} key={index}>
                {tag}
              </div>
            ))}
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
        open={visible}
        className="project-drawer"
      >
        <div className={Styles.projectDrawer}>
          <div className={Styles.projectDrawerContent}>
            <h3>{data.title}</h3>
            <p>{data.smalldesc}</p>
            <Carousel autoplay>
              {data.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={data.title} />
                </div>
              ))}
            </Carousel>
            <h4>About</h4>
            <p>{data.desc}</p>
            <h4>What I Have Done</h4>
            <ul className="resps">
              {data.responsibilities?.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
            <h4>Technologies</h4>
            <div className={Styles.tags}>
              {data.tags.map((tag, index) => (
                <div className={Styles.tag} key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <a
            href={data.link}
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
