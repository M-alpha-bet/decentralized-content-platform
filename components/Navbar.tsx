"use client";

import React, { useState, useEffect } from "react";
import { MdWallet } from "react-icons/md";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const connectModal = useConnectModal();
  const openConnectModal = connectModal?.openConnectModal;

  const [isOpen, setIsOpen] = useState(false);

  const shortAddress = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  const handleConnect = () => {
    if (openConnectModal) {
      openConnectModal();
      return;
    }

    if (typeof window !== "undefined" && (window as any).ethereum) {
      (window as any).ethereum
        .request({ method: "eth_requestAccounts" })
        .catch(() => {});
      return;
    }

    toast(
      "No wallet modal available. Make sure RainbowKit Provider is mounted or install a Web3 wallet extension."
    );
  };

  // disable scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/feeds", label: "Feeds" },
  ];

  if (isConnected && address) {
    links.push(
      { href: "/feed/create", label: "Create" },
      { href: `/feeds/${address}`, label: "My Feeds" }
    );
  }

  return (
    <>
      <div className="fixed justify-between w-full top-0 z-50 backdrop-blur-3xl h-[50px] md:h-[70px] flex items-center  px-4 md:px-[70px]">
        {/* Left side - logo + hamburger */}
        <div>
          <Link href="/">
            <p className="font-archivo text-xl">OxOwned</p>
          </Link>
        </div>

        {/* Right side - menu + wallet */}
        <div className="flex items-center md:gap-6">
          <div className="text-2xl md:hidden" onClick={() => setIsOpen(true)}>
            <IoIosMenu />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-[20px]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors text-[16px] ${
                  pathname === link.href
                    ? "text-darkColor underline"
                    : "text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet button */}
          <div className="ml-2 flex justify-end">
            {isConnected ? (
              <p
                title={address}
                onClick={() => disconnect()}
                className="rounded-text-gray px-[14px] py-[3px] font-medium cursor-pointer select-all"
              >
                {shortAddress(address)}
              </p>
            ) : (
              <button
                onClick={handleConnect}
                className="flex items-center gap-[8px] px-[10px] text-[12px] md:text-[16px] md:py-[3px] py-[2px] border-colored rounded-md"
              >
                Connect wallet <MdWallet />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          {/* Slide menu */}
          <div
            className={`absolute top-0 left-0 w-full bg-grayColor pt-[20px] p-6 transform transition-transform rounded-b-[40px] duration-300 ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <p className="font-archivo text-xl">OxOwns</p>
              <button className="text-3xl" onClick={() => setIsOpen(false)}>
                <IoIosClose />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg ${
                    pathname === link.href
                      ? "text-darkColor underline"
                      : "text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Wallet inside modal */}
              <div className="mt-6">
                {isConnected ? (
                  <p
                    title={address}
                    onClick={() => {
                      disconnect();
                      setIsOpen(false);
                    }}
                    className="rounded-text-gray px-[14px] py-[3px] font-medium cursor-pointer select-all"
                  >
                    {shortAddress(address)}
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      handleConnect();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-[8px] px-[10px] py-[3px] border-colored rounded-md"
                  >
                    Connect wallet <MdWallet />
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
