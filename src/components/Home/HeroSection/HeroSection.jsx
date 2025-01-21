import clsx from "clsx";
import classes from "./HeroSection.module.css";
import { Button, Heading, Text } from "@/components/common";

const HeroSection = () => {
  return (
    <section className={classes.wrapper}>
      <div className={clsx("container", classes.container)}>
        <div className={classes.infoContainer}>
          <Heading xl5>Find Your Best Tutor In Our System</Heading>
          <Text xl>
            The right mentoring relationship can be a powerful tool for
            professional growth. Bark up the right tree.
          </Text>
          <Button>APPLY NOW</Button>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
