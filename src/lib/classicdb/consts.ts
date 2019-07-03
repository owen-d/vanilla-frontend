import * as cnf from "./config";

export const html_tag_regex = /\s*(<[^>]*>)/g;

export const weapon_types = [
  "dagger",
  "mace",
  "sword",
  "wand",
  "staff",
  "polearm",
  "axe",
  "fishing pole",
  "fist weapon",
  "bow",
  "crossbow",
  "gun",
  "thrown",
  "miscellaneous",
  "held in off-hand",
  "shield",
];

export const weapon_slots_suffixes = [
  "two-hand",
  "one-hand",
];

export const armor_types = [
  "head",
  "neck",
  "shoulder",
  "chest",
  "hands",
  "wrist",
  "waist",
  "legs",
  "feet",
];

export const item_quality_colors: { [index: number]: number } = {
  6: 0xe5cc80, // Artifact
  5: 0xff8000, // Legendary
  4: 0xa335ee, // Epic.
  3: 0x0070dd, // Rare.
  2: 0x1EFF00, // Uncommon.
  1: 0x9d9d9d, // Poor.
};

export const quality_colors_itemization: { [index: string]: number } = {
  ["Artifact"]: 0xe5cc80,
  ["Legendary"]: 0xff8000,
  ["Epic"]: 0xA335EE,
  ["Rare"]: 0x0070dd,
  ["Uncommon"]: 0x1EFF00,
  ["Common"]: 0xFFFFFF,
  ["Poor"]: 0x9D9D9D,
};

export const misc_icon = `${cnf.host}/images/icons/large/trade_engineering.png`;
