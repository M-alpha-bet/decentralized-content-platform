import FeedCard from "@/components/FeedCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getFeedsByWallet } from "@/lib/feed";
import React from "react";

type UserFeedspageProps = {
  params: { address: string };
};

export default async function UserFeedspage({ params }: UserFeedspageProps) {
  const address = await params.address;
  const userFeeds = await getFeedsByWallet(address);
  return (
    <>
      <Navbar />
      <div className="py-[70px] px-[200px] ">
        <h1 className="text-center heading-text">
          Your{" "}
          <span className="rounded-text-gray px-[10px] py-[2px]">Feeds</span>
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-[70px]">
          {userFeeds.map((feed: any) => (
            <FeedCard key={feed._id} feed={feed} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
