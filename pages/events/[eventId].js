import styles from "../../styles/event.module.css";

import data from "../../json/data.json";

// const photosArr = data[0].photos;

const Event = () => {
  return (
    <div className="absolute top-1/2 left-1/2 text-white">
      {data && (
        <div>
          {data[0].photos.map((item) => {
            console.log(item);
          })}
        </div>
      )}
    </div>
  );
};

export default Event;
