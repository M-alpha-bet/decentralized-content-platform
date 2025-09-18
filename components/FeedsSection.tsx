import React from "react";
import FeedCard from "./FeedCard";
import SlideInHalfScreen from "./animations/SlideInHalfScreen";
import { getAllFeeds } from "@/lib/feed";

export default async function CardSection() {
  const feeds = await getAllFeeds();
  return (
    <>
      <div className="py-[100px] md:px-[200px] ">
        <SlideInHalfScreen>
          <h2 className="text-center">
            Popular{" "}
            <span className="rounded-text-gray px-[10px] py-[2px]">Feeds</span>
          </h2>
        </SlideInHalfScreen>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-[40px] px-[20px]">
          {feeds.map((feed: any) => (
            <FeedCard key={feed._id} feed={feed} />
          ))}
        </div>
      </div>
    </>
  );
}
