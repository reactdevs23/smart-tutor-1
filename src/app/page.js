import Image from "next/image";

import HeroSection from "@/components/Home/HeroSection/HeroSection";
import StudyOproTunity from "@/components/Home/StudyOproTunity/StudyOproTunity";
import classes from "./page.module.css";
import ChooseYourLearning from "@/components/Home/ChooseYourLearning/ChooseYourLearning";
import OurSystem from "@/components/Home/OurSystem/OurSystem";
import Footer from "@/Layouts/Footer/Footer";
export default function Home() {
  return (
    <>
      <HeroSection />
      <StudyOproTunity /> <OurSystem />
      <ChooseYourLearning />
      <Footer />
    </>
  );
}
