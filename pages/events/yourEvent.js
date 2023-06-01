import { useState, useEffect, useRef } from "react";
import { fetchUploadedFiles } from "../../sersvices/eventsServices";

import EventCard from "../../components/eventCard";
// import data from "../../json/data.json";

const YourEvent = () => {
  const [events, setEvents] = useState({});
  const [userbaseData, setUserbaseData] = useState();

  useEffect(() => {
    async function fetchData() {
      const userbase = await fetchUploadedFiles();
      setUserbaseData(userbase);
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
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-20 mt-48 mb-48">
      {/* {events.map((item) => {
        
      })} */}

      {Object.keys(events)?.map((eventKey, index) => {
        const eventObj = userbaseData.find((obj) => obj.userId === eventKey);
        const name = eventObj?.username;
        return (
          // <>
          //   {events[eventKey].map((image) => (
          //     <>
          //       <img src={`/uploads/${eventKey}/${image}`} width={320} />
          //       <p className="text-white" key={index}>
          //         {image}
          //       </p>
          //     </>
          //   ))}
          // </>
          <>
            {/* {console.log(events[eventKey])} */}
            {
              <EventCard
                imagesArr={events[eventKey]}
                eventKey={eventKey}
                eventName={name || ""}
              ></EventCard>
            }
          </>
        );
      })}
    </div>
  );
};

export default YourEvent;
