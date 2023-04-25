import styles from "../../styles/event.module.css";
import Image from "next/image";
import data from "../../json/data.json";
import { useRouter } from "next/router";

const Event = () => {
  //map routes to data and wait for the router to be ready.
  //https://www.youtube.com/watch?v=cZYI2sOKnXA
  const router = useRouter();
  const { eventId } = router.query;

  const photosArr = data[eventId]?.photos;
  const randomArr = ["hLarge", "hXLarge", "vLarge", "large", ""];

  return (
    <div className="">
      {data && (
        <div className={styles.gallery}>
          {photosArr?.map((photoPath) => {
            return (
              <div
                className={
                  styles.item +
                  " " +
                  styles[
                    randomArr[Math.floor(Math.random() * randomArr.length)]
                  ]
                }
              >
                <Image
                  className={styles.image}
                  src={photoPath}
                  alt="Picture of the author"
                  fill
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Event;
