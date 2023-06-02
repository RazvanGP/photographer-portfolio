import styles from "../../styles/event.module.css";
import Image from "next/image";
// import data from "../../json/data.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PhotoViewer from "../../components/photoViewer";
import { useContext } from "react";
import { Context } from "../../context/context";

const Event = () => {
  const [photosArr, setPhotosArr] = useState([]);
  // const [eventsArr, setEventsArr] = useState([]);
  const router = useRouter();
  const { eventId } = router.query;

  const [photoIndex, setPhotoIndex] = useState();
  const { photoViewerOpen, setPhotoViewerOpen } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUploadedFiles() {
      fetch("/api/uploadFiles?preview=false")
        .then((res) => {
          res.json().then((data) => {
            setPhotosArr(data.dirs[eventId]);
            // console.log(photosArr);
            setIsLoading(false);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUploadedFiles();
  }, [eventId]);

  //map routes to data and wait for the router to be ready.
  //https://www.youtube.com/watch?v=cZYI2sOKnXA

  // console.log(eventId);

  // const photosArr = data[eventId]?.photos;
  const randomArr = ["hLarge", "hXLarge", "vLarge", "large", ""];

  return (
    <div className="">
      {photosArr && (
        <div className={!photoViewerOpen ? styles.gallery : "overflow-hidden"}>
          {photosArr?.map((imgName, index) => {
            return (
              <div
                className={
                  styles.item +
                  " " +
                  styles[
                    randomArr[Math.floor(Math.random() * randomArr.length)]
                  ]
                }
                key={imgName + "_" + index}
              >
                <Image
                  className={styles.image}
                  src={`/uploads/${eventId}/${imgName}`}
                  alt="Picture of the author"
                  fill
                  onClick={() => {
                    setPhotoIndex(index);
                    setPhotoViewerOpen(true);
                  }}
                  loading="lazy"
                  onLoadingComplete={() => {
                    setIsLoading(false);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {photoViewerOpen && (
        <PhotoViewer
          photosArr={photosArr}
          eventId={eventId}
          photoIndex={photoIndex}
        />
      )}
    </div>
  );
};

export default Event;
