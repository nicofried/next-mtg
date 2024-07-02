"use client";
import React, { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { ModeToggle } from "@/components/modetoggle";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import DamageSlider from "../components/DamageSlider";
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


interface Player {
  playerName: string;
  cardName: string;
  // Add other properties of player here as needed
}

function PlayerPage({ player }: { player: Player }) {
  const [HP, setHP] = useState(40); // Initial value is 40
  const [Poison, setPoison] = useState(0); // Initial value is 0
  const [imgBase64, setImgBase64] = useState("");
  const [cardName, setCardName] = useState("The Ur-Dragon");

  const handleConfirm = (damageAmount: number) => {
    console.log(`Damage confirmed: ${damageAmount}`);
    setHP(HP + damageAmount);
  };
  
  const fetchData = async () => {
    try {
      const url = `https://192.168.0.100:5001/api/Card/${encodeURIComponent(
        cardName
      )}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setImgBase64(data.imageBase64);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [player.cardName]); // Add player.cardName to the dependency array



  return (
    <div style={{maxWidth: '300px' }}>
        <h1 className="font-sans text-6xl font-bold" style={{ textAlign: 'center', margin: '20px' }}>{player.playerName}</h1>




                
                  {imgBase64 && (
                    <Image
                      className={"commander-image"}
                      src={`data:image/jpeg;base64,${imgBase64}`}
                      alt="Card Image"
                      layout="responsive"
                      width={200}
                      height={300}
                      quality={75} // Adjust the quality of the image (0-100)
                    />
                  )}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', margin: 0, padding: 0 }}> 
        <p>Health Points (HP)</p>
        <ReactSpeedometer
          maxValue={100} // Maximum value
          value={HP} // Current HP
          needleColor="blue" // Needle color
          segments={3} // Divide the gauge into three segments: 0-10, 10-30, 30-100
          segmentColors={["red", "orange", "green"]} // Reverse the segment colors
          customSegmentStops={[0, 10, 30, 100]} // Set segment ranges
          height={200} // Set the height         
        />

        
      </div>
      <DamageSlider onConfirm={handleConfirm} text="Damage" />

        <div style={{ width: '200%', margin: 0, padding: '10px 0 10px 0' }}> 
      <button 
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        onClick={() => {
          console.log('Aoe damage +1 button clicked');
          setHP(HP - 1);
        }}
      >
        Aoe damage +1
      </button>
      <button 
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" 
        style={{ marginLeft: "0px" }}
        onClick={() => {
          console.log('Aoe damage -1 button clicked');
          setHP(HP + 1);
        }}
      >
        Aoe damage -1
      </button>
      </div>


    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}> 
        <p>Poison Level</p>
        <ReactSpeedometer
          maxValue={10} // Maximum value
          value={Poison} // Current Poison
          needleColor="blue" // Needle color
          segments={3} // Divide the gauge into three segments: 0-5, 5-8, 8-10
          segmentColors={["green", "orange", "red"]} // Set segment colors
          customSegmentStops={[0, 5, 8, 10]} // Set segment ranges
          height={200} // Set the height   
        />
      </div>




      <div style={{ width: '200%', margin: 0, padding: '10px 0 0 0' }}> 
  
      <button 
    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" 
    style={{ marginLeft: "0px" , width: "150px" }}
    onClick={() => {
      console.log('Poison -1 button clicked');
      setPoison(Poison - 1);
    }}
  >
    Poison -1
  </button>
  <button 
    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
    style={{ width: "150px" }}
    onClick={() => {
      console.log('Poison +1 button clicked');
      setPoison(Poison + 1);
    }}
  >
    Poison +1
  </button>

  </div>

</div>
    
  );
}

interface Game {
  gameID: number;
  players: Player[];
  // Add other properties of game here as needed
}

export default function Home() {
  const [game, setGame] = useState<Game | null>(null);
  const params = useParams();
  const gameID = params.gameID;

  const fetchGameData = async () => {
    try {
      const url = "https://192.168.0.100:5001/api/Games/GetActiveGamesWithPlayers";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // Check if there is at least one game and one player
      if (data.length > 0 && data[0].players.length > 0) {
        const game = data.find((game: Game) => game.gameID === Number(gameID));

        // Check if the game exists and has at least one player
        if (game && game.players.length > 0) {
        setGame(game); // Set the game data
    }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Run fetchGameData when the component mounts
  useEffect(() => {
    fetchGameData(); // Call the renamed function
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <main
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start", // Align items at the start of the cross axis
        flexDirection: "row", // Stack items horizontally
      }}
    >
      {game && game.players.map((player: Player, index: number) => (
        <div style={{ flex: "1 0 21em", margin: "1em" }}>
          <PlayerPage key={index} player={player} />
        </div>
      ))}
    </main>
  );
}


