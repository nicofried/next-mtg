'use client'
import React, { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { ModeToggle } from "@/components/modetoggle";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import DamageSlider from "./components/DamageSlider";
import { Input } from "@/components/ui/input";
import { useParams } from 'next/navigation';

import ReactSpeedometer from "react-d3-speedometer"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";




export default function Home() {
  const [activeGames, setActiveGames] = useState<Game[]>([]); // to store the list of active games

  const fetchGameData = async () => {
    try {
      const url = "https://192.168.0.100:5001/api/Games/GetActiveGames";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setActiveGames(data); // store the list of active games
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []); // Empty dependency array means this effect runs once on mount

  type Game = {
    gameID: number;
    gameName: string;
  };


  return (
    <main
      style={{
        display: "flex-box",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div className="flex-container">
        <ModeToggle />
        <Link className={buttonVariants()} href="/users">Brukere</Link>
      </div>

            <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // This makes the div take up the full height of the viewport
      }}>
        {/* Map over the list of active games to create a button for each game */}
        {activeGames.map((game) => (
          <Button>
          <Link className={buttonVariants()} href={`/${game.gameID}`}>{game.gameName}</Link>

          </Button>

        ))}
      </div>


    </main>
  );
}
