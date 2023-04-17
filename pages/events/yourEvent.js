import useSWR from "swr";

import EventCard from "../../components/eventCard";

const YourEvent = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("../api/staticData", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" w-full h-screen grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center overflow-auto pt-[180px] pb-[150px] gap-10 bg-gray-950">
      {JSON.parse(data).map((item) => {
        return (
          // <Link
          //   className="w-[300px] h-[500px] border-2"
          //   href={{
          //     pathname: `./${item.name}`,
          //   }}
          // >
          //   Go to pages/yourEvent/{item.name}.js
          // </Link>
          <EventCard item={item} key={item.id}></EventCard>
        );
      })}
    </div>
  );
};

export default YourEvent;
