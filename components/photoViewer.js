import { useState } from "react";
import Image from "next/image";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "../context/context";

const PhotoViewer = ({ photosArr, eventId, photoIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(photoIndex);
  const { setPhotoViewerOpen } = useContext(Context);

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photosArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photosArr.length - 1 : prevIndex - 1
    );
  };

  const closeViewer = () => {
    // Logic to close the viewer, e.g., hide the component or navigate back
    setPhotoViewerOpen(false);
  };

  return (
    <div className="photo-modal absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-95">
      <div className="relative max-w-3xl w-full h-full">
        <Image
          src={`/uploads/${eventId}/${photosArr[currentIndex]}`}
          alt={`Photo ${currentIndex + 1}`}
          className="w-full h-full object-contain"
          width={500}
          height={500}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
          <button
            className=" bg-white rounded-full opacity-50 ml-4"
            onClick={prevPhoto}
          >
            <GrFormPrevious size={64} />
          </button>
          <button
            className=" bg-white rounded-full opacity-50 mr-4"
            onClick={nextPhoto}
          >
            <GrFormNext size={64} />
          </button>
        </div>
        <button
          className="absolute top-[20%] right-[-60px] bg-white rounded-full opacity-50"
          onClick={closeViewer}
        >
          <AiOutlineClose size={32} />
        </button>
      </div>
    </div>
  );
};

export default PhotoViewer;
