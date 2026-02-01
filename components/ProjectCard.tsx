import { useState, memo } from "react";
import Styles from "../styles/Projectcard.module.scss";
import { Drawer, Carousel } from "antd";
import Icon from "@mdi/react";
import { mdiArrowLeftThinCircleOutline } from "@mdi/js";
import useWindowDimensions from "../utils/useWindowDimensions";
import Image from "next/image";
import type { Project } from "../types";

interface ProjectCardProps {
  data: Project;
  state: unknown;
  fullpage: {
    setLockAnchors: (lock: boolean) => void;
    setAllowScrolling: (allow: boolean) => void;
    setKeyboardScrolling: (allow: boolean) => void;
  } | null;
}

const ProjectCard = ({ data, state, fullpage }: ProjectCardProps) => {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
    if (width && width >= 968 && fullpage) {
      fullpage.setLockAnchors(true);
      fullpage.setAllowScrolling(false);
      fullpage.setKeyboardScrolling(false);
    }
  };

  const onClose = () => {
    setVisible(false);
    if (width && width >= 968 && fullpage) {
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
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showDrawer();
          }
        }}
        aria-label={`View ${data.title} project details`}
      >
        <Image
          src={data.images[0]}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={data.id <= 2}
        />
        <div className={Styles.cardOverlay}>
          <h3>{data.title}</h3>
          <div className={Styles.tags}>
            {data.tags.map((tag, index) => (
              <div className={Styles.tag} key={`${data.id}-tag-${index}`}>
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
                <div key={`${data.id}-carousel-${index}`}>
                  {/* Using standard img tag as Ant Design Carousel requires it */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={`${data.title} screenshot ${index + 1}`} />
                </div>
              ))}
            </Carousel>
            <h4>About</h4>
            <p>{data.desc}</p>
            <h4>What I Have Done</h4>
            <ul className="resps">
              {data.responsibilities?.map((responsibility, index) => (
                <li key={`${data.id}-resp-${index}`}>{responsibility}</li>
              ))}
            </ul>
            <h4>Technologies</h4>
            <div className={Styles.tags}>
              {data.tags.map((tag, index) => (
                <div className={Styles.tag} key={`${data.id}-drawer-tag-${index}`}>
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

// Memoize to prevent unnecessary re-renders
export default memo(ProjectCard);
