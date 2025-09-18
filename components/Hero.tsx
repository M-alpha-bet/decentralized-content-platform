import React from "react";
import { MdEmail, MdMonetizationOn, MdAccountCircle } from "react-icons/md";
import BounceIn from "./animations/BounceIn";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="w-full justify-center items-center text-center flex pt-[150px] md:pt-[200px]">
        <div>
          <p className="text-[10px] md:text-[15px]">
            You can send and receive{" "}
            <span className=" bg-darkColor text-grayColor rounded-full px-[7px] py-[1px] mb-[4px] ">
              tips
            </span>{" "}
            on your content
          </p>
          <h1 className="heading-text">
            Own and Share <br />
            <span className="rounded-text-gray px-[16px] md:py-[2px]">
              your
            </span>{" "}
            content without limits
          </h1>
        </div>
      </div>
      <BounceIn className="justify-center py-[70px] flex gap-[20px]">
        <button className="outlined-button">Sign in with google</button>
        <button className="rounded-button px-[10px] py-[3px]">
          Explore feeds
        </button>
      </BounceIn>
      <div className="rounded-t-[70px] md:rounded-t-[100px] py-[40px] md:py-[70px] md:mt-[70px] bg-grayColor md:px-[200px]">
        <h2 className="text-center pb-[40px] md:pb-[70px]">
          Quick and{" "}
          <span className="rounded-button px-[10px] py-[2px]">Easy</span> Setup
        </h2>
        <div className="md:flex w-full justify-between">
          <div className="guide-box">
            <MdEmail className="size-[20px] md:size-[30px] mr-[4px] md:mx-auto" />
            <h3>
              Create an{" "}
              <Link href="/login" className="text-darkColor font-semibold">
                account
              </Link>{" "}
              and start creating your content
            </h3>
          </div>
          <div className="guide-box pt-[20px] md:pt-0">
            <MdAccountCircle className="size-[20px] md:size-[30px] mr-[4px] md:mx-auto" />
            <h3>
              Mint your original content as{" "}
              <Link href="/login" className="text-darkColor font-semibold">
                NFTs
              </Link>
            </h3>
          </div>
          <div className="guide-box pt-[20px] md:pt-0">
            <MdMonetizationOn className="size-[20px] md:size-[30px] mr-[4px] md:mx-auto" />
            <h3>
              Connect wallet, share and receive{" "}
              <Link href="/login" className="text-darkColor font-semibold">
                tips
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
