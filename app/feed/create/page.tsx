import FeedForm from "@/components/FeedForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function CreatePage() {
  return (
    <>
      <Navbar />
      <div className="py-[70px] px-[200px] ">
        <h1 className="heading-text text-center">
          Create{" "}
          <span className="rounded-text-gray px-[20px] py-[2px]">Feed</span>
        </h1>
        <FeedForm />
      </div>
      <Footer />
    </>
  );
}
