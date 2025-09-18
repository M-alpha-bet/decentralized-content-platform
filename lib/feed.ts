"use server";

import { client } from "@/lib/sanity";

export async function createFeed({
  alias,
  aliasImage,
  title,
  text,
  wallet,
  feedImage,
}: {
  alias: string;
  aliasImage?: File;
  title: string;
  text: string;
  wallet: string;
  feedImage?: File;
}) {
  try {
    let aliasImageAssetId: string | null = null;
    let feedImageAssetId: string | null = null;

    // Upload alias image if provided
    if (aliasImage) {
      const asset = await client.assets.upload("image", aliasImage);
      aliasImageAssetId = asset._id;
    }

    // Upload feed image if provided
    if (feedImage) {
      const asset = await client.assets.upload("image", feedImage);
      feedImageAssetId = asset._id;
    }

    const feed = await client.create({
      _type: "feed",
      alias,
      title,
      text,
      wallet,
      isMinted: false,
      publishedAt: new Date().toISOString(),
      ...(aliasImageAssetId && {
        aliasImage: {
          _type: "image",
          asset: { _type: "reference", _ref: aliasImageAssetId },
        },
      }),
      ...(feedImageAssetId && {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: feedImageAssetId },
        },
      }),
    });

    return feed;
  } catch (err: any) {
    throw new Error(`Failed to create feed: ${err.message}`);
  }
}

export async function getFeedsByWallet(wallet: string) {
  return await client.fetch(
    `*[_type == "feed" && wallet == $wallet]{
      _id,
      alias,
      title,
      text,
      isMinted,
      publishedAt,
      wallet,
      "aliasImageUrl": aliasImage.asset->url,
      "feedImageUrl": image.asset->url
    }`,
    { wallet }
  );
}

export async function getAllFeeds() {
  return await client.fetch(
    `*[_type == "feed"]{
      _id,
      alias,
      title,
      text,
      isMinted,
      publishedAt,
      wallet,
      "aliasImageUrl": aliasImage.asset->url,
      "feedImageUrl": image.asset->url
    }`
  );
}

export async function getFeedById(id: string) {
  return await client.fetch(
    `*[_type == "feed" && _id == $id][0]{
      _id,
      alias,
      title,
      text,
      isMinted,
      wallet,
      publishedAt,
      "aliasImageUrl": aliasImage.asset->url,
      "feedImageUrl": image.asset->url
    }`,
    { id }
  );
}

export async function markAsMinted(feedId: string) {
  return await client.patch(feedId).set({ isMinted: true }).commit();
}
