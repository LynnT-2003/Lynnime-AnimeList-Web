"use client";
import React from "react";
import AnimeList from "@/components/AnimeList";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <AnimeList />
    </>
  );
}
