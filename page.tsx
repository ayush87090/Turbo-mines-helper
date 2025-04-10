
'use client';
import React, { useState } from "react";

export default function Home() {
  const [gridSize, setGridSize] = useState(5);
  const [numMines, setNumMines] = useState(1);
  const [tilesClicked, setTilesClicked] = useState(0);
  const [suggestedTiles, setSuggestedTiles] = useState([]);

  const calculateSafeProbability = () => {
    const totalTiles = gridSize * gridSize;
    const remainingTiles = totalTiles - tilesClicked;
    const safeTiles = remainingTiles - numMines;
    return ((safeTiles / remainingTiles) * 100).toFixed(2);
  };

  const suggestTiles = () => {
    const totalTiles = gridSize * gridSize;
    const tiles = Array.from({ length: totalTiles }, (_, i) => i);
    const randomTiles = tiles
      .filter((_, i) => i >= tilesClicked)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setSuggestedTiles(randomTiles);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Turbo Mines Safe Tile Helper</h1>
      <div className="flex gap-2">
        <input
          type="number"
          className="border rounded p-2"
          placeholder="Grid Size (e.g., 5)"
          value={gridSize}
          onChange={(e) => setGridSize(parseInt(e.target.value))}
        />
        <input
          type="number"
          className="border rounded p-2"
          placeholder="Number of Mines"
          value={numMines}
          onChange={(e) => setNumMines(parseInt(e.target.value))}
        />
        <input
          type="number"
          className="border rounded p-2"
          placeholder="Tiles Clicked"
          value={tilesClicked}
          onChange={(e) => setTilesClicked(parseInt(e.target.value))}
        />
        <button onClick={suggestTiles} className="bg-blue-500 text-white px-4 py-2 rounded">Suggest Tiles</button>
      </div>
      <div>
        <p>Estimated Safe Tile Probability: {calculateSafeProbability()}%</p>
        {suggestedTiles.length > 0 && (
          <div className="mt-2">
            <p className="font-semibold">Suggested Tiles to Click:</p>
            <div className="flex gap-2 mt-1">
              {suggestedTiles.map((tile) => (
                <div key={tile} className="bg-green-200 text-black px-3 py-1 rounded">
                  Tile #{tile + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
