/* global document */
import React, { useEffect } from "react";
import colors from "~colors";
import BottomMenu from "./BottomMenu";
import GameMap from "./GameMap";
import Header from "./Header";
import Inspector from "./Inspector";
import Jobs from "./Jobs";
import Laser from "./Laser";
import LoadGame from "./LoadGame";
import Resources from "./Resources";
import Status from "./Status";
import GameOver from "./GameOver";
import { TILE_SIZE, MAP_WIDTH, MAP_CSS_WIDTH } from "~constants";
import Introduction from "./Introduction";
import HotkeysProvider from "./HotkeysProvider";
import Tutorials from "./Tutorials";

export default function Game() {
  useEffect(() => {
    Object.entries(colors).forEach(([color, value]) =>
      document.body.style.setProperty(`--${color}`, value),
    );
  }, []);

  return (
    <HotkeysProvider>
      <main className="h-full flex flex-col">
        <Header />
        <LoadGame />
        <div className="flex flex-row flex-1 w-full max-w-screen-xl mx-auto">
          <div className="flex-none w-64 h-full flex flex-col border-l border-r border-gray z-10">
            <Status />
            <Laser />
            <Resources />
            <Jobs />
          </div>
          <div
            className="flex-none h-full border-gray"
            style={{
              width: MAP_CSS_WIDTH,
            }}
          >
            <GameMap />
            <BottomMenu />
          </div>
          <div className="flex-none w-64 h-full flex flex-col border-l border-r border-gray z-10">
            <Tutorials />
            <Inspector />
          </div>
        </div>
        <GameOver />
        <Introduction />
      </main>
    </HotkeysProvider>
  );
}
