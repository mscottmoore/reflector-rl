import {
  RED,
  PRIORITY_ITEM,
  GREEN,
  WHITE,
  PRIORITY_THROWING,
} from "~/constants";
import { Entity } from "~/types/Entity";

const templates: { [id: string]: Partial<Entity> } = {
  REFLECTOR_BASE: {
    blocking: { throwing: false, moving: true },
    destructible: {},
  },
  REFLECTOR_UP_RIGHT: {
    parentTemplate: "REFLECTOR_BASE",
    display: {
      tile: "reflector_1",
      glyph: "/",
      color: WHITE,
      priority: PRIORITY_THROWING,
    },
    reflector: { type: "/" },
  },
  REFLECTOR_DOWN_RIGHT: {
    parentTemplate: "REFLECTOR_BASE",
    display: {
      tile: "reflector_2",
      glyph: "\\",
      color: WHITE,
      priority: PRIORITY_THROWING,
    },
    reflector: { type: "\\" },
  },
  SPLITTER_BASE: {
    blocking: { throwing: false, moving: true },
    destructible: {},
  },
  SPLITTER_HORIZONTAL: {
    parentTemplate: "SPLITTER_BASE",
    display: {
      tile: "splitter_1",
      glyph: "⬌",
      color: WHITE,
      priority: PRIORITY_THROWING,
    },
    splitter: { type: "horizontal" },
  },
  SPLITTER_VERTICAL: {
    parentTemplate: "SPLITTER_BASE",
    display: {
      tile: "splitter_2",
      glyph: "⬍",
      color: WHITE,
      priority: PRIORITY_THROWING,
    },
    splitter: { type: "vertical" },
  },
  TENT: {
    display: {
      tile: "tent",
      glyph: "▲",
      color: WHITE,
      priority: PRIORITY_ITEM,
    },
    blocking: {
      moving: true,
      throwing: false,
    },
    housing: {
      capacity: 1,
      occupancy: 1,
    },
    destructible: {},
  },
};

export default templates;
