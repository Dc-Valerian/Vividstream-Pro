import { useState, useEffect } from "react";
import { HiStatusOnline } from "react-icons/hi";
import { IoCloudOfflineSharp } from "react-icons/io5";

const Online: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [displayStyle, setDisplayStyle] = useState<string>(
    isOnline ? "hidden" : "flex"
  );

  const checkOnline = () => {
    setIsOnline(true);
    setDisplayStyle("flex");

    setTimeout(() => {
      setDisplayStyle("hidden");
    }, 5000);
  };

  const checkOffline = () => {
    setIsOnline(false);
    setDisplayStyle("flex");
  };

  useEffect(() => {
    window.addEventListener("online", checkOnline);
    window.addEventListener("offline", checkOffline);

    return () => {
      window.removeEventListener("online", checkOnline);
      window.removeEventListener("offline", checkOffline);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${displayStyle} z-[9999] transition-all duration-500 bg-opacity-80 ${
        isOnline ? "bg-gray" : "bg-black"
      }`}
    >
      {isOnline ? (
        <div className="flex flex-col items-center justify-center text-center">
          <HiStatusOnline className="text-green-500 text-4xl mb-4" />
          <p className="text-lg font-semibold text-green-500 animate-pulse">
            Great! Welcome Back Online!
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <IoCloudOfflineSharp className="text-red-500 text-4xl mb-4" />
          <p className="text-lg font-semibold text-red-500 animate-pulse">
            Oops! Looks like you're currently offline!
            <br />
            <br />
          </p>
          <p className="text-lg font-semibold text-white">
            Connect back to Internet or Use a Stable Network
          </p>
        </div>
      )}
    </div>
  );
};

export default Online;
