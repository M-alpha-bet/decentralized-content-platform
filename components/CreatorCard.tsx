"use client";

import React from "react";

export default function CreatorCard() {
  const creatorData = [
    { id: 1, alias: "Sahmi", points: 1100 },
    { id: 2, alias: "Aso", points: 1000 },
    { id: 3, alias: "Gidi", points: 900 },
    { id: 4, alias: "Stanlo", points: 800 },
    { id: 5, alias: "Phe", points: 700 },
  ];

  return (
    <>
      {creatorData.map((creator) => (
        <div
          key={creator.id}
          className="relative h-[150px] bg-[url(/images/diagonal-striped-brick.png)] bg-darkColor rounded-[40px] shadow-xl"
        >
          {/* Shiny overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-darkColor to-grayColor animate-shine" />

          {/* Creator name */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-[20px] font-bold animate-pulse-slow">
                {creator.alias}
              </p>
              <p className="text-grayColor text-[10px]">
                {creator.points} points
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
