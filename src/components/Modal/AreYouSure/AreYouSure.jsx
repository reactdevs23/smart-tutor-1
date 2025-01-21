import Modal from "@/components/common/Modal/Modal";
import classes from "./AreYouSure.module.css";
import { Button, Heading } from "@/components/common";
const AreYouSure = ({ isActive, onClose, onDelete, title }) => {
  return (
    <Modal heading="heading" isActive={isActive} onClose={onClose} sm>
      <div className={classes.infoContainer}>
        <Heading textCenter>{title}</Heading>
        <Button onClick={onDelete}>Proceed</Button>
      </div>
    </Modal>
  );
};
export default AreYouSure;
