import { clsx } from "clsx";
import classes from "./StudyOproTunity.module.css";
import {
  alumni,
  currentStudent,
  futureStudent,
  studyOportunity,
  worldStudent,
} from "@/images";
import { Button, Heading, Text } from "@/components/common";

const StudyOproTunity = () => {
  const cards = [
    {
      img: futureStudent,
      title: "Future Students",
    },
    {
      img: worldStudent,
      title: "World Students",
    },
    { img: currentStudent, title: "Current Students" },
    { img: alumni, title: "Alumni & Donors" },
  ];
  return (
    <section className={clsx(classes.wrapper, "container2")}>
      <div className={classes.cards}>
        {cards.map((card, i) => (
          <div className={classes.card} key={i}>
            <img
              src={card.img.src}
              alt="#"
              key={i}
              className={classes.cardImg}
            />
            <Heading xl>{card.title}</Heading>
          </div>
        ))}
      </div>
      <div className={classes.studyOportunity}>
        <img src={studyOportunity.src} alt="#" className={classes.img} />
        <div className={classes.infoContainer}>
          <Heading xl3 semiBold>
            Study abroad with the best overseas{" "}
            <span className="bold">education</span> consultants
          </Heading>
          <Text base>
            Besides providing you with new knowledge and training in chosen
            disciplines, our university also gives you an opportunity to benefit
            from spending your free time by playing .
          </Text>
          <Button>Learn More</Button>
        </div>
      </div>
    </section>
  );
};
export default StudyOproTunity;
