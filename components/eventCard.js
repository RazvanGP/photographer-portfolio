import styles from "./styles/eventCard.module.css";

import Link from "next/link";
import Image from "next/image";

const EventCard = ({ item }) => {
  return (
    <div className="relative flex flex-col justify-around items-center h-[400px] ">
      <div className="flex gap-28 ">
        <Image
          className="self-center rounded-md drop-shadow-lg"
          src={item.previewPhotos[0]}
          alt="Alt text for the picture"
          width={200}
          height={300}
        ></Image>
        <Image
          className="rounded-md drop-shadow-lg absolute left-1/3 bottom-1/4 z-[2]"
          src={item.previewPhotos[1]}
          alt="Alt text for the picture"
          width={200}
          height={300}
        ></Image>
        <Image
          className="self-center rounded-md drop-shadow-lg"
          src={item.previewPhotos[2]}
          alt="Alt text for the picture"
          width={200}
          height={300}
        ></Image>
      </div>

      <Link
        className=""
        href={{
          pathname: `./${item.id}`,
        }}
      >
        <h2 className="font-primary text-3xl text-slate-300">{item.name}</h2>
      </Link>
    </div>
  );
};
export default EventCard;
