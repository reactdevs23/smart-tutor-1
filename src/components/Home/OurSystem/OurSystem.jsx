import { ourSystem } from "@/images";
import classes from "./OurSystem.module.css";
import { Button, Heading, Text } from "@/components/common";

const OurSystem = () => {
  return (
    <section className={classes.wrapper}>
      <div className={classes.container}>
        <img src={ourSystem.src} alt="#" className={classes.img} />
        <div className={classes.infoContainer}>
          <Heading xl3 semiBold primitive0>
            Why use our
            <span className="bold">system?</span>
          </Heading>
          <Text base primitive0>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </Text>
          <Button>Read More</Button>
        </div>
      </div>
    </section>
  );
};
export default OurSystem;
