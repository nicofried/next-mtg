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

export default function Home() {
  const [imgBase64, setImgBase64] = useState("");
  const [cardName, setCardName] = useState("The Ur-Dragon");
  const [cardRule, setCardRule] = useState("");

  const params = useParams();
  const gameID = params.gameID;

  const [firstPlayerName, setFirstPlayerName] = useState("");

  const [HP, setHP] = useState(40); // Initial value is 40
  const [Poison, setPoison] = useState(0); // Initial value is 0
  // You can update the HP and Poison values like this:
  // setHP(newHPValue);
  // setPoison(newPoisonValue);

  const handleConfirm = (damageAmount: number) => {
    console.log(`Damage confirmed: ${damageAmount}`);
    setHP(HP+damageAmount)
  };

  const fetchGameData = async () => { // Renamed function
    try {
      const url = "https://192.168.0.100:5001/api/Games/GetActiveGamesWithPlayers";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // Check if there is at least one game and one player
      if (data.length > 0 && data[0].players.length > 0) {
        const game = data.find((game: { gameID: number, players: { playerName: string }[] }) => game.gameID === Number(gameID));

        // Check if the game exists and has at least one player
        if (game && game.players.length > 0) {
        setFirstPlayerName(game.players[0].playerName); // Set the first player's name
    }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
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
  };

    // This runs when the component mounts
    useEffect(() => {
      fetchData();
    }, []); // Empty dependency array means this effect runs once on mount
  
    // Run fetchGameData when the component mounts
    useEffect(() => {
      fetchGameData(); // Call the renamed function
    }, []); // Empty dependency array means this effect runs once on mount


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
        <Link className={buttonVariants()} href="/users">
          Brukere
        </Link>

      </div>

      <div className="flex-container">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Spiller 1: {firstPlayerName}</CardTitle>
            {/*<CardDescription>{firstPlayerName}</CardDescription>*/}
          </CardHeader>
          <CardContent>
            <div className="flex-box">
              <div className="flex-box">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {imgBase64 && (
                    <Image
                      className={"commander-image"}
                      src={`data:image/jpeg;base64,${imgBase64}`}
                      alt="Card Image"
                      width={200}
                      height={300}
                      unoptimized
                    />
                  )}
                </div>

                <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Card name.."
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                <Button type="submit" onClick={fetchData}>
                  Fetch
                </Button>
              </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Damage</AccordionTrigger>
                    <AccordionContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button onClick={() => {
                          console.log('Aoe damage +1 button clicked');
                            setHP(HP-1);
                        }}>Aoe damage +1</Button>
                        <Button style={{ marginLeft: "4px" }} onClick={() => {
                          console.log('Aoe damage -1 button clicked');
                          setHP(HP+1);
                        }}>Aoe damage -1</Button>



                      </div>





                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "10px",
                          marginLeft: "10px",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                      >
                      <Button onClick={() => {
                          console.log('Poisen +1 button clicked');
                          setPoison(Poison+1);
                        }}>Poisen +1</Button>
                        <Button style={{ marginLeft: "4px" }} onClick={() => {
                          console.log('Aoe damage -1 button clicked');
                          setPoison(Poison-1);
                        }}>Poisen -1</Button>



                      </div>
                      

                      <DamageSlider onConfirm={handleConfirm} text="Mads" />

                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Commander damage</AccordionTrigger>
                          <AccordionContent>
                            <DamageSlider
                              onConfirm={handleConfirm}
                              text="Kristian"
                            />

                            <DamageSlider
                              onConfirm={handleConfirm}
                              text="Nico"
                            />
                            <DamageSlider
                              onConfirm={handleConfirm}
                              text="Mads"
                            />
                            <DamageSlider
                              onConfirm={handleConfirm}
                              text="Niklas"
                            />
                            <DamageSlider
                              onConfirm={handleConfirm}
                              text="Jonas"
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </CardContent>
          <CardFooter>

          <div>  
          <p>Health Points (HP)</p>
          <ReactSpeedometer
              maxValue={100} // Maximum value
              value={HP} // Current HP
              needleColor="blue" // Needle color
              segments={3} // Divide the gauge into three segments: 0-10, 10-30, 30-100
              segmentColors={["red", "orange", "green"]} // Reverse the segment colors
              customSegmentStops={[0, 10, 30, 100]} // Set segment ranges
            />

              <p>Poison Level</p>
            <ReactSpeedometer
              maxValue={10} // Maximum value
              value={Poison} // Current Poison
              needleColor="blue" // Needle color
              segments={3} // Divide the gauge into three segments: 0-5, 5-8, 8-10
              segmentColors={["green", "orange", "red"]} // Set segment colors
              customSegmentStops={[0, 5, 8, 10]} // Set segment ranges
            />


                    </div>
                    
            <div className="flex-box">
            {/*<p>HP: {HP}</p> {/* Display the HP value */}
            {/* <p>Poison: {Poison}</p> {/* Display the Poison value */}
            </div>
          </CardFooter>
        </Card>
      </div>




    </main>
  );
}
