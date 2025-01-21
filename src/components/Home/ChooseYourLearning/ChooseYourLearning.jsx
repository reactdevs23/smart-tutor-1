import { Button, Heading, Text } from "@/components/common";
import classes from "./ChooseYourLearning.module.css";
import { australia, uk, usa } from "@/images";
import clsx from "clsx";
import { FaAngleRight } from "react-icons/fa";

const ChooseYourLearning = () => {
  const cards = [
    {
      img: australia,
      title: "Study in Australia",
      info: "Aliquam erat volutpat. Morbi in orci risus. Etiam ut accumsan leo...",
      readmore: "#",
    },
    {
      img: uk,
      title: "Study in UK ",
      info: "Adipiscing at in tellus integer. Pellentesque massa placerat duis...",
      readmore: "#",
    },
    {
      img: usa,
      title: "Study in USA",
      info: "Id ornare arcu odio ut sem nulla. Sagittis aliquam malesuada...",
      readmore: "#",
    },
  ];
  return (
    <section className={classes.wrapper}>
      <div className={clsx(classes.container, "container2")}>
        <Heading xl4 textCenter>
          Choose your <span className="highlight">learning</span> <br /> country
          for study!
        </Heading>
        <div className={classes.cards}>
          {cards.map((card, i) => (
            <div className={classes.card} key={i}>
              <img
                src={card.img.src}
                alt="#"
                key={i}
                className={classes.cardImg}
              />
              <div className={classes.infoContainer}>
                <Heading xl>{card.title}</Heading>
                <Text>{card.info}</Text>
                <Button transparent>
                  {" "}
                  Read More <FaAngleRight />{" "}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button>View All</Button>
      </div>
    </section>
  );
};
export default ChooseYourLearning;
