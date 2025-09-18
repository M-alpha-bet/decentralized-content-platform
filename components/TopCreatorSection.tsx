import React from "react";
import SlideInHalfScreen from "./animations/SlideInHalfScreen";
import CreatorCard from "./CreatorCard";

export default function TopCreatorSection() {
  return (
    <>
      <div className="md:pb-[100px] md:px-[200px]">
        <SlideInHalfScreen>
          <h2 className="text-center">
            Top{" "}
            <span className="rounded-text-gray px-[10px] py-[2px]">
              Creators
            </span>
          </h2>
        </SlideInHalfScreen>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-[80px] gap-[30px] mt-[40px] px-[20px]">
          <CreatorCard />
        </div>
      </div>
    </>
  );
}
