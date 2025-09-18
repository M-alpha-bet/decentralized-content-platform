import React from "react";
import { MdOutlineWhatsapp } from "react-icons/md";
import { RiGithubFill, RiLinkedinFill, RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      <div className="w-full  justify-center text-center pt-[70px] pb-[20px]">
        <div className="flex md:gap-[70px] gap-[30px] justify-center my-[20px]">
          <a href="https://twitter.com/oxowns" target="_blank" rel="noreferrer">
            <RiTwitterXLine className="text-darkColor size-[25px]" />
          </a>
          <a
            href="https://whatsapp.com/oxowns"
            target="_blank"
            rel="noreferrer"
          >
            <MdOutlineWhatsapp className="text-darkColor size-[25px]" />
          </a>
          <a
            href="https://www.linkedin.com/oxowns/"
            target="_blank"
            rel="noreferrer"
          >
            <RiLinkedinFill className="text-darkColor size-[25px]" />
          </a>
          <a
            href="https://www.github.com/in/oxowns/"
            target="_blank"
            rel="noreferrer"
          >
            <RiGithubFill className="text-darkColor size-[25px]" />
          </a>
        </div>
        <p className="text-[12px] text-center">with ❤️ by Martinelli</p>
      </div>
    </>
  );
}
