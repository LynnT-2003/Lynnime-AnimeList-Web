"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const getUpcomingAnime = async () => {
  try {
    console.log("Fetching upcoming Anime...");
    const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        "Failed to fetch models. Something went wrong during the fetching process in ModelsList.jsx"
      );
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getTopAnime = async () => {
  try {
    console.log("Fetching top anime...");
    const res = await fetch("https://api.jikan.moe/v4/top/anime", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        "Failed to fetch models. Something went wrong during the fetching process in ModelsList.jsx"
      );
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getCurrentlyAnime = async () => {
  try {
    console.log("Fetching Currently Anime...");
    const res = await fetch("https://api.jikan.moe/v4/seasons/now", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        "Failed to fetch models. Something went wrong during the fetching process in ModelsList.jsx"
      );
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

export default function AnimeList() {
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [currentlyAnime, setCurrentlyAnime] = useState([]);

  const fetchUpcomingAnime = async () => {
    const fetchedAnime = await getUpcomingAnime();
    setUpcomingAnime(fetchedAnime);
    console.log("Fetched Upcoming Anime.");
  };

  const fetchTopAnime = async () => {
    const fetchedAnime = await getTopAnime();
    setTopAnime(fetchedAnime);
    console.log("Fetched Top Anime.");
  };

  const fetchCurrentlyAnime = async () => {
    const fetchedAnime = await getCurrentlyAnime();
    setCurrentlyAnime(fetchedAnime);
    console.log("Fetched Currently Anime.");
  };

  useEffect(() => {
    const fetchDataSequentially = async () => {
      try {
        await fetchUpcomingAnime();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        await fetchTopAnime();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetchCurrentlyAnime();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataSequentially();
  }, []);

  return (
    <Grid container spacing={2} className="">
      <Grid xs={9}>
        <div className="px-12">
          <Typography variant="h5" className="text-white font-bold pb-2 mt-12">
            Upcoming Anime
          </Typography>
          <Slider {...settings}>
            {upcomingAnime.map((item) => (
              <div key={item.mal_id}>
                <img
                  src={item.images.jpg.large_image_url}
                  style={{ width: "95%", height: "400px", objectFit: "cover" }}
                  alt={item.title_english}
                />
                <Typography
                  noWrap
                  sx={{ maxWidth: 200 }}
                  className="text-white"
                >
                  {item.title_english && item.title_english.length > 30
                    ? item.title_english.substring(0, 30) + "..."
                    : item.title_english}
                </Typography>
              </div>
            ))}
          </Slider>
        </div>
        <div className="px-12">
          <Typography variant="h5" className="text-white font-bold pb-2 mt-10">
            Currently Trending
          </Typography>
          <Slider {...settings}>
            {currentlyAnime.map((item) => (
              <div key={item.mal_id}>
                <img
                  src={item.images.jpg.large_image_url}
                  style={{ width: "95%", height: "400px", objectFit: "cover" }}
                  alt={item.title_english}
                />
                <Typography
                  noWrap
                  sx={{ maxWidth: 200 }}
                  className="text-white"
                >
                  {item.title_english && item.title_english.length > 30
                    ? item.title_english.substring(0, 30) + "..."
                    : item.title_english}
                </Typography>
              </div>
            ))}
          </Slider>
        </div>
      </Grid>
      <Grid xs={3}>
        <div className="mt-10">
          <div className="text-white" style={{ backgroundColor: "#3f3f3f" }}>
            <Typography variant="h5" className="text-white font-bold pl-4 py-1">
              Top Popular Anime
            </Typography>
          </div>
          <div className="text-white">
            {topAnime.slice(0, 5).map((item) => (
              <div key={item.mal_id} className="py-2">
                <img
                  src={item.images.jpg.large_image_url}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                  }}
                  alt={item.title_english}
                />
                <Typography noWrap className="text-white">
                  {item.title_english && item.title_english.length > 50
                    ? item.title_english.substring(0, 50) + "..."
                    : item.title_english}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
