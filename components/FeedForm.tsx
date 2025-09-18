"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { createFeed } from "@/lib/feed";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function FeedForm() {
  const { address, isConnected } = useAccount();

  const router = useRouter();

  const [alias, setAlias] = useState("");
  const [aliasImage, setAliasImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAliasImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAliasImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast("Connect your wallet first");
      return;
    }

    if (!alias || !title || !image) {
      toast("Please fill all fields");
      return;
    }

    if (image.size > 1024 * 1024) {
      toast("Image size should be less than 1MB");
      return;
    }

    setLoading(true);
    try {
      await createFeed({
        alias,
        aliasImage: aliasImage || undefined,
        title,
        text,
        wallet: address,
        feedImage: image || undefined,
      });
      toast.success("Feed created!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMint = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    // TODO: trigger NFT minting via contract call
    console.log("Minting NFT for:", { title, image });
  };

  return (
    <form className="max-w-2xl mx-auto mt-10 p-6 rounded-xl shadow-lg space-y-6">
      <div>
        <label className="block font-medium mb-1">Alias</label>
        <input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Your alias"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Alias Image</label>
        <input type="file" accept="image/*" onChange={handleAliasImageChange} />
        {aliasImage && (
          <img
            src={URL.createObjectURL(aliasImage)}
            alt="Preview"
            className="mt-3 w-full rounded-lg object-cover max-h-64"
          />
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Feed title"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your content..."
          className="w-full border rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="mt-3 w-full rounded-lg object-cover max-h-64"
          />
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 border border-gray-900 text-gray-900 px-4 py-2 rounded-full hover:bg-gray-900 hover:text-white"
        >
          Publish
        </button>
        <button
          onClick={handleMint}
          disabled={loading}
          className="flex-1 bg-darkColor text-white px-4 py-2 rounded-full hover:bg-grayColor hover:text-gray-900"
        >
          Mint
        </button>
      </div>
    </form>
  );
}
