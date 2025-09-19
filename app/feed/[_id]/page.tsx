import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getFeedById } from "@/lib/feed";
import formatDate from "@/lib/formatDate";
import Image from "next/image";

interface FeedPageProps {
  params: { _id: string };
}

export default async function FeedPage({ params }: FeedPageProps) {
  const _id = params._id;
  const feed = await getFeedById(_id);

  if (!feed) {
    return <div className="p-8">Feed not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            {feed.aliasImageUrl && (
              <Image
                src={feed.aliasImageUrl as string}
                alt={feed.alias}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{feed.alias}</h2>
              <p className="text-gray-600 text-[12px]">{feed.wallet}</p>
            </div>
          </div>
          <div>
            <p className="text-darkColor text-[14px] border-colored px-[12px] py-[1px]">
              {feed.isMinted ? "minted" : "unminted"}
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold">{feed.title}</h1>
        <p className="text-gray-600">{feed.text}</p>

        <div className="">
          {feed.feedImageUrl && (
            <img
              src={feed.feedImageUrl}
              alt={feed.title}
              className="rounded-lg object-contain"
            />
          )}
        </div>

        <p className="text-sm text-gray-500">
          Published: {formatDate(feed.publishedAt)}
        </p>

        <div className="flex justify-between text-gray-600">
          <p>431 tips</p>
          <p>178.6Sol</p>
        </div>
        <div className="flex justify-center">
          <div>
            <div className="text-gray-600 text-[14px] flex items-center gap-[10px]">
              <p>valued at:</p>
              <span className="text-2xl rounded-text-gray px-[25px] py-[5px]">
                1251.99 Sol
              </span>
            </div>
            <div className="flex items-center justify-center pt-[15px] ">
              <button className="text-[14px] px-[15px] border rounded-full">
                contact creator
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
