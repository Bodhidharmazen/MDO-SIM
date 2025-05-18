import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

// World settings
const GRID_SIZE = 50;
const TILE_SIZE = 32; // Size of one tile (width of diamond base)
const TILE_HEIGHT = 20; // Height of the tile (for 3D effect)

// Simple world generation (random resources for now)
function generateWorld() {
  const world = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      // 0 = ground, 1 = food, 2 = hazard, 3 = water, 4 = stone
      let val = 0;
      if (Math.random() < 0.04) val = 1; // food
      else if (Math.random() < 0.03) val = 2; // hazard
      else if (Math.random() < 0.03) val = 3; // water
      else if (Math.random() < 0.03) val = 4; // stone
      row.push(val);
    }
    world.push(row);
  }
  return world;
}

function drawIsometricTile(g, x, y, color, height = 0) {
  // Convert grid to isometric
  const isoX = (x - y) * (TILE_SIZE / 2);
  const isoY = (x + y) * (TILE_SIZE / 4) - height;
  // Top face
  g.beginFill(color.top);
  g.moveTo(isoX, isoY - TILE_HEIGHT / 2);
  g.lineTo(isoX + TILE_SIZE / 2, isoY);
  g.lineTo(isoX, isoY + TILE_HEIGHT / 2);
  g.lineTo(isoX - TILE_SIZE / 2, isoY);
  g.lineTo(isoX, isoY - TILE_HEIGHT / 2);
  g.endFill();
  // Left face
  g.beginFill(color.left);
  g.moveTo(isoX - TILE_SIZE / 2, isoY);
  g.lineTo(isoX, isoY + TILE_HEIGHT / 2);
  g.lineTo(isoX, isoY + TILE_HEIGHT / 2 + height);
  g.lineTo(isoX - TILE_SIZE / 2, isoY + height);
  g.lineTo(isoX - TILE_SIZE / 2, isoY);
  g.endFill();
  // Right face
  g.beginFill(color.right);
  g.moveTo(isoX + TILE_SIZE / 2, isoY);
  g.lineTo(isoX, isoY + TILE_HEIGHT / 2);
  g.lineTo(isoX, isoY + TILE_HEIGHT / 2 + height);
  g.lineTo(isoX + TILE_SIZE / 2, isoY + height);
  g.lineTo(isoX + TILE_SIZE / 2, isoY);
  g.endFill();
}

function getTileColors(type) {
  switch (type) {
    case 1: // food
      return { top: 0x8be78b, left: 0x6ab76a, right: 0x5fa65f };
    case 2: // hazard
      return { top: 0xffa07a, left: 0xcc7a5a, right: 0xb35f3a };
    case 3: // water
      return { top: 0x7ecbff, left: 0x5a99cc, right: 0x3a7ab3 };
    case 4: // stone
      return { top: 0xc0c0c0, left: 0x999999, right: 0x7a7a7a };
    default: // ground
      return { top: 0xe3e6b0, left: 0xbfc08b, right: 0xa0a06a };
  }
}

const IsometricWorld = () => {
  const pixiContainer = useRef();
  const appRef = useRef();

  useEffect(() => {
    // Create Pixi app
    const app = new PIXI.Application({
      width: 1000,
      height: 700,
      background: '#e3e6f0',
      antialias: true
    });
    pixiContainer.current.appendChild(app.view);
    appRef.current = app;

    // Generate world
    const world = generateWorld();
    const offsetX = 500;
    const offsetY = 80;

    // Draw world
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const g = new PIXI.Graphics();
        const color = getTileColors(world[y][x]);
        drawIsometricTile(g, x, y, color, world[y][x] === 4 ? 6 : 0); // stone is "taller"
        g.x = offsetX;
        g.y = offsetY;
        app.stage.addChild(g);
      }
    }

    // Clean up on unmount
    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  return <div ref={pixiContainer} style={{ width: 1000, height: 700, margin: 'auto' }} />;
};

export default IsometricWorld;
