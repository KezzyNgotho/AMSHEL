import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedHackathonDetail } from "../features/hackathon/hackathonSlice";
import HackathonMedia from "../utils/HackathonMedia";
import { LinearProgress } from "@mui/material";

const OrgHackathons = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hackathonsPayload, setHackathonsPayload] = useState([]);

  // Define dummy hackathons data
  const dummyHackathons = [
    {
      cover_image_url: "cover_image_1.jpg",
      avatar_url: "avatar_1.jpg",
      title: "Hackathon 1",
      highlight: "Highlight 1",
      description: "Description for Hackathon 1",
    },
    {
      cover_image_url: "cover_image_2.jpg",
      avatar_url: "avatar_2.jpg",
      title: "Hackathon 2",
      highlight: "Highlight 2",
      description: "Description for Hackathon 2",
    },
  ];

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setHackathonsPayload(dummyHackathons);
      setLoading(false);
    }, 2000);

    // Clean up timeout
    return () => clearTimeout(timeout);
  }, []);

  const handleViewClick = (hackathonDetails) => {
    dispatch(
      setSelectedHackathonDetail({ selectedHackathonDetail: hackathonDetails })
    );
    navigate("/organizer/hackathons/detail");
  };

  return (
    <>
      {loading && <LinearProgress />}
      {!loading && (
        <div className="flex flex-wrap space-x-4 mt-5 ml-4">
          {hackathonsPayload.length > 0 &&
            hackathonsPayload.map((field, index) => (
              <div
                key={index}
                className="border border-[#C7C7C7]  hover:border-custom-blue relative overflow-hidden  rounded-[20px] shadow-xl mb-4 w-[300px] h-[380px] transition-transform transform hover:-translate-y-1"
              >
                <HackathonMedia
                  cover_image_url={field.cover_image_url}
                  avatar_url={field.avatar_url}
                />
                <div className="relative">
                  <div className=" border-[#7C7C7C] border-t absolute bottom-0 left-0 right-0 h-1/3 bg-white p-4 rounded-[20px]">
                    <p className="text-sm font-bold mt-4">{field.title}</p>
                    <p className="text-sm text-gray-700">{field.highlight}</p>
                    <p className="text-xs text-gray-500  mt-2 h-[35px] overflow-hidden ">
                      {field.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 mt-[50px] ml-[22px]">
                  <button
                    onClick={() => handleViewClick(field)}
                    className="border border-blue-500 rounded-md text-blue-500 w-[250px] text-xs mt-[80px] py-2 hover:bg-custom-blue mb-3 hover:text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          {hackathonsPayload.length < 1 && (
            <h1 className="font-bold">
              You do not have any hackathons yet, click on create to get started
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default OrgHackathons;
