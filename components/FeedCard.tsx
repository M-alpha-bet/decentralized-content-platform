"use client";

import React, { useState } from "react";
import BounceIn from "./animations/BounceIn";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import formatDate from "@/lib/formatDate";

export default function FeedCard({ feed }: { feed: any }) {
  const [activeTip, setActiveTip] = useState<number | null>(null);

  return (
    <>
      <div className="shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between p-[20px]">
          <div className="flex gap-[10px]">
            <img
              src={feed.aliasImageUrl}
              alt={feed.alias}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-archivo">{feed.alias}</p>
              <p className="text-[11px]">{formatDate(feed.publishedAt)}</p>
            </div>
          </div>
          <div>
            <p className="text-darkColor text-[14px] border-colored px-[12px] py-[1px]">
              {feed.isMinted ? "minted" : "unminted"}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative rounded-[40px] my-[10px] bg-grayColor h-[350px] overflow-hidden w-full flex flex-col">
          {/* Case 1: Only Text */}
          {feed.text && !feed.feedImageUrl && (
            <div className="p-[20px] h-[330px] overflow-hidden">
              <p className="feeds-box-text text-justify">{feed.text}</p>
            </div>
          )}

          {/* Case 2: Only Image */}
          {!feed.text && feed.feedImageUrl && (
            <img
              src={feed.feedImageUrl}
              alt="Content"
              className="w-full h-full object-cover rounded-[30px]"
            />
          )}

          {/* Case 3: Text + Image */}
          {feed.text && feed.feedImageUrl && (
            <div className="pt-[20px]">
              <p className="feeds-box-text h-[45px] px-[20px] line-clamp-2 overflow-hidden mb-2">
                {feed.text}
              </p>
              <div className="h-full">
                <img
                  src={feed.feedImageUrl}
                  alt="Content"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
            </div>
          )}

          {/* Tip Modal Overlay */}
          <AnimatePresence>
            {activeTip === feed._id && (
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveTip(null)}
              >
                <motion.div
                  className="bg-white rounded-3xl p-2 w-64 shadow-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-[2px]">
                    Amount(USDT)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded-2xl px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-grayColor"
                  />
                  <button className="w-full bg-darkColor text-white py-2 rounded-full font-semibold hover:bg-darkColor transition">
                    Tip
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <BounceIn className="flex justify-between px-[20px] py-[10px]">
          <Link href={`/feed/${feed._id}`}>
            <button className="outlined-button">View</button>
          </Link>
          <button
            onClick={() => setActiveTip(feed._id)}
            className="rounded-button px-[20px] py-[3px]"
          >
            Tip
          </button>
        </BounceIn>
      </div>
    </>
  );
}
