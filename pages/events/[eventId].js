import styles from "../../styles/event.module.css";
import Image from "next/image";
// import data from "../../json/data.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Event = () => {
  const [photosArr, setPhotosArr] = useState([]);
  // const [eventsArr, setEventsArr] = useState([]);
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    async function fetchUploadedFiles() {
      fetch("/api/uploadFiles?preview=false")
        .then((res) => {
          res.json().then((data) => {
            setPhotosArr(data.dirs[eventId]);
            console.log(photosArr);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUploadedFiles();
  }, []);

  //map routes to data and wait for the router to be ready.
  //https://www.youtube.com/watch?v=cZYI2sOKnXA

  // console.log(eventId);

  // const photosArr = data[eventId]?.photos;
  const randomArr = ["hLarge", "hXLarge", "vLarge", "large", ""];

  return (
    <div className="">
      {photosArr && (
        <div className={styles.gallery}>
          {photosArr?.map((imgName) => {
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
                  src={`/uploads/${eventId}/${imgName}`}
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
