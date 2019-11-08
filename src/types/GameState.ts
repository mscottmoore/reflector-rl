import { Entity } from "./Entity";

export interface GameState {
  version: string;
  entities: {
    [id: string]: Entity;
  };
  entitiesByPosition: {
    [position: string]: string[];
  };
  messageLog: string[];
  gameOver: boolean;
  victory: boolean;
  turnsUntilNextImmigrant: number;
  morale: number;
  time: TimeState;
  isBuildMenuOpen: boolean;
  resources: {
    [resource: string]: number;
  };
}

export interface TimeState {
  day: number;
  turn: number;
  isNight: boolean;
  turnsUntilChange: number;
  directionWeights: {
    n: number;
    s: number;
    e: number;
    w: number;
  };
}
