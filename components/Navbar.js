import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const Navbar = () => {
  const links = [
    {
      id: 1,
      link: "Anime",
    },
    {
      id: 2,
      link: "Manga",
    },
    {
      id: 3,
      link: "Community",
    },
    {
      id: 4,
      link: "Industry",
    },
    {
      id: 5,
      link: "Watch",
    },
    {
      id: 6,
      link: "Read",
    },
    {
      id: 7,
      link: "Help",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center w-full px-4 py-4 text-white bg-black">
        <h1 className="text-5xl ml-2" style={{ fontFamily: "AgreloyCyr" }}>
          Welcome to Lynnime !
        </h1>
        <div className="px-4 space-x-4">
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              paddingX: "24px", // Adjust padding as needed
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              paddingX: "24px", // Adjust padding as needed
            }}
          >
            Sign up
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center w-full px-4 py-4 bg-blue-600">
        <ul className="hidden md:flex">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="nav-links px-4 cursor-pointer font-bold text-xl text-white hover:scale-105 duration-200 link-underline"
            >
              <Link href={link}>{link}</Link>
            </li>
          ))}
        </ul>
        <div className="px-4 space-x-4"></div>
      </div>
    </>
  );
};

export default Navbar;
