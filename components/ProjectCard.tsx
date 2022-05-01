/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Styles from "../styles/Projectcard.module.scss";
const ProjectCard = (props: {
  title: string;
  images: string[];
  tags: string[];
  description: string;
}) => {
  const cardStyle = {
    backgroundImage: `url('${props.images[0]}')`,
    width: "100%",
    height: "300px",
  };
  return (
    <div className={Styles.projectCard}>
      {/* <div style={cardStyle}></div> */}
      {/* <Image
        src={props.image}
        alt={props.image}
        width="auto"
        height="250px"
        className={Styles.cardImage}
      /> */}
      <div className={Styles.cardImageWrapper}>
        <img
          src={props.images[0]}
          alt={props.images[0]}
          style={{
            width: "100%",
            borderRadius: "8px 8px 0 0",
            minHeight: "250px",
          }}
        />
        <div className={Styles.cardOverlay}>
          <div className={Styles.tags}>
            {props.tags.map((tag: any, index: number) => {
              return (
                <div className={Styles.tag} key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={Styles.cardDetails}>
        <h3>{props.title}</h3>
      </div>
    </div>
  );
};
export default ProjectCard;
