import EventCard from "../../components/eventCard";
import data from "../../json/data.json";

const YourEvent = () => {
  return (
    <div className=" w-full h-screen grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center overflow-auto pt-[180px] pb-[150px] gap-10 bg-gray-950">
      {data.map((item) => {
        return <EventCard item={item} key={item.id}></EventCard>;
      })}
    </div>
  );
};

export default YourEvent;
