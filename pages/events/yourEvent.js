import { useState, useEffect } from "react";

import EventCard from "../../components/eventCard";
// import data from "../../json/data.json";

const YourEvent = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    async function fetchUploadedFiles() {
      fetch("/api/uploadFiles?preview=true")
        .then((res) => {
          res.json().then((data) => {
            setEvents(data.dirs);
            console.log(data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUploadedFiles();
  }, []);

  return (
    <div className=" w-full h-screen grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center overflow-auto pt-[180px] pb-[150px] gap-10 bg-gray-950">
      {/* {events.map((item) => {
        return <EventCard item={item} key={item.id}></EventCard>;
      })} */}

      {Object.keys(events)?.map((eventKey, index) => {
        return (
          <>
            {events[eventKey].map((image) => (
              <>
                <img src={`/uploads/${eventKey}/${image}`} width={320} />
                <p className="text-white" key={index}>
                  {image}
                </p>
              </>
            ))}
          </>
        );
      })}
    </div>
  );
};

export default YourEvent;
