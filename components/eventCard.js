import styles from "./styles/eventCard.module.css";

import Link from "next/link";
import Image from "next/image";

const EventCard = ({ imagesArr, eventKey, eventName }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex gap-3">
        {/* {imagesArr.map((image) => {
          <Image
            className="self-center rounded-md drop-shadow-lg"
            src={`/uploads/${eventKey}/${image}`}
            alt="Alt text for the picture"
            width={200}
            height={300}
          ></Image>;
        })} */}
        {imagesArr.map((image, index) => (
          <>
            <Image
              key={index + "__" + "image"}
              className="object-cover object-center rounded-md drop-shadow-lg"
              src={`/uploads/${eventKey}/${image}`}
              alt="Alt text for the picture"
              width={200}
              height={200}
              loading="lazy"
            ></Image>
            ;
          </>
        ))}
      </div>

      <Link
        className=""
        href={{
          pathname: `./${eventKey}`,
        }}
      >
        <h2 className="font-primary text-3xl text-slate-300">{eventName}</h2>
      </Link>
    </div>
  );
};
export default EventCard;
