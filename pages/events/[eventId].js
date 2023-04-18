import styles from "../../styles/event.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const Event = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  return (
    <div className="absolute top-1/2 left-1/2 text-white">Event: {eventId}</div>
  );
};

export default Event;
