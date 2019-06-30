/**
 * @fileoverview Class definition for Item.
 * @author Andreask Kruhlmann
 * @since 1.2.0
 */

import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as config from './config'
import {
  css_class_to_item_quality,
  css_class_to_player_class,
  fetch_thumbnail
} from "./lib";
import { CharacterClass, ItemBinding } from "./types";
import { Effect } from "./effect";
import { html_tag_regex } from "./consts"

export class Item {

  /**
   * Generates an item based on a tooltip table from the database website.
   *
   * @async
   * @param id - Database item id.
   * @param href - Link to item.
   * @param effects - List of item effects.
   * @param table - Item tooltip table to parse.
   * @returns - Generated item.
   */
  public static async from_table(id: string,
    href: string,
    effects: Effect[],
    table: Cheerio): Promise<Item> {
    const $ = cheerio.load(table.html());
    const thumbnail = await fetch_thumbnail(id);
    const table_contents = table.find("tr td").first();
    const html = table.find("tr td").first().html();
    const html_lines = html.split(html_tag_regex);
    const name_node = table_contents.find("b").first();
    const class_nodes = table_contents.find("font");

    const name = name_node.text();
    const quality = css_class_to_item_quality(name_node.attr("class"));
    const classes: CharacterClass[] = [];
    class_nodes.each((_, class_node) => {
      const node_class_str = $(class_node).attr("class");
      const required_class = css_class_to_player_class(node_class_str);
      classes.push(required_class);
    });
    const flavor_text = table.find(".q").first().text();
    const binds_on = html.includes("Binds when picked up")
      ? ItemBinding.ON_PICKUP
      : html.includes("Binds when equipped")
        ? ItemBinding.ON_EQUIP
        : ItemBinding.NOBIND;
    const unique = (html_lines.find((line) => {
      const regex = /Unique/g;
      return ((line || "").match(regex) || []).length > 0;
    }) || []).length > 0;
    const armor_line = (html_lines.find((line) => {
      const regex = /[0-9]+ Armor/g;
      return ((line || "").match(regex) || []).length > 0;
    }) || "").split(" ");
    const armor = armor_line.length > 1
      ? parseInt(armor_line[0], 10)
      : null;
    const level_line = (html_lines.find((line) => {
      const regex = /Requires Level [0-9]+/g;
      return ((line || "").match(regex) || []).length > 0;
    }) || "").split(" ");
    const level_requirement = level_line.length > 2
      ? parseInt(level_line[2], 10)
      : null;
    const durability_line = (html_lines.find((line) => {
      const regex = /Durability [0-9]+ \/ [0-9]+/g;
      return ((line || "").match(regex) || []).length > 0;
    }) || "").split("/");
    const durability = durability_line.length > 1
      ? parseInt(durability_line[1].trim(), 10)
      : null;
    const primary_stats = html_lines.filter((line) => {
      return line.startsWith("+") || line.startsWith("-");
    });

    // Tables
    const table_count = table_contents.find("table").length;
    const equipment_slot = table_count > 0
      ? $(table_contents.find("table")[0]).find("td").text()
      : null;
    const equipment_type = table_count > 0
      ? $(table_contents.find("table")[0]).find("th").text()
      : null;
    const does_damage = table_count > 1;
    const damage_range_line = does_damage
      ? $(table_contents.find("table")[1]).find("td").text()
      : null;
    const swing_speed_line = does_damage
      ? $(table_contents.find("table")[1]).find("th").text()
      : null;
    const damage_range = damage_range_line
      ? {
        high: parseInt(damage_range_line.split(" ")[2], 10),
        low: parseInt(damage_range_line.split(" ")[0], 10),
      } : null;
    const swing_speed = does_damage
      ? parseFloat(swing_speed_line.split("Speed ")[1])
      : null;
    const dps_line = html_lines.find((line) => {
      return line.startsWith("(") && line.includes("damage per second)");
    }) || "";
    const dps = dps_line !== ""
      ? parseFloat(dps_line.replace("(", "")
        .replace(" damage per second)", "")
        .trim())
      : null;
    return new Item(id,
      name,
      href,
      thumbnail,
      quality,
      unique,
      binds_on,
      classes,
      level_requirement,
      durability,
      primary_stats,
      effects,
      armor,
      equipment_slot,
      equipment_type,
      damage_range,
      swing_speed,
      dps,
      flavor_text);
  }

  /**
   * Generates an item based on the database website tooltip html.
   *
   * @async
   * @param id - Database item id.
   * @param href - Item link.
   * @param html - Tooltip HTML.
   * @returns - Generated item.
   */
  public static async from_tooltip(id: string,
    href: string,
    html: string): Promise<Item> {
    const $ = cheerio.load(html);
    const tables = $("div.tooltip > table tbody tr td").children("table");

    // First table contains raw stats of the item. Second table contains
    // effects, set bonuses and flavor text.
    const stat_table = tables.get(0);
    const misc_table = tables.get(1);
    const effects = Effect.from_item_table($(misc_table));

    return Item.from_table(id, href, await effects, $(stat_table));
  }

  /**
   * Builds an item from a database item id.
   *
   * @async
   * @param id - Database item id.
   * @returns - Generated item.
   */
  public static async from_id(id: string | number): Promise<Item> {
    const url = `${config.host}/?item=${id}`;
    const html = await request({ uri: url });
    return Item.from_tooltip(`${id}`, url, html);
  }

  // Required properties.
  public id: string;
  public name: string;
  public href: string;
  public thumbnail_href: string;
  public quality_color: string;
  public unique: boolean;
  public binds_on: ItemBinding;

  // Optional properties
  public class_restrictions?: CharacterClass[];
  public level_requirement?: number;
  public durability?: number;
  public primary_stats?: string[];
  public effects?: Effect[];
  public armor?: number;
  public equipment_slot?: string;
  public equipment_type?: string;
  public damage_range?: { low: number, high: number };
  public swing_speed?: number;
  public dps?: number;
  public flavor_text?: string;

  /**
   *  Constructor.
   *
   * @constructor
   * @param id- Item id in database.
   * @param name - In-game name.
   * @param href - Database link.
   * @param quality_color - Color of quality (purple for epic, blue for rare);
   * @param thumbnail_href - Thumbnail link.
   * @param unique - Whether the item is unique.
   * @param binds_on - Type of binding (pickup, equip, no binding).
   * @param class_restrictions - List of classes, which can equip the item.
   * @param level_requirement - Required level to equip item.
   * @param durability - Maximum durability.
   * @param primary_stats - List of primary stats such as stamina and added
   * elemental damage.
   * @param effects - List of associated effects.
   * @param armor - Armor value.
   * @param equipment_slot - Slot where item is equipped.
   * @param equipment_type - Type of item.
   * @param damage_range - The range of damage values the item can do.
   * @param swing_speed - Time in seconds between each attack.
   * @param dps - Average damage done per second.
   */
  public constructor(id: string,
    name: string,
    href: string,
    thumbnail_href: string,
    quality_color: string,
    unique: boolean,
    binds_on: ItemBinding,
    class_restrictions?: CharacterClass[],
    level_requirement?: number,
    durability?: number,
    primary_stats?: string[],
    effects?: Effect[],
    armor?: number,
    equipment_slot?: string,
    equipment_type?: string,
    damage_range?: { low: number, high: number },
    swing_speed?: number,
    dps?: number,
    flavor_text?: string) {
    this.id = id;
    this.name = name;
    this.href = href;
    this.thumbnail_href = thumbnail_href;
    this.quality_color = quality_color;
    this.unique = unique;
    this.binds_on = binds_on;
    this.class_restrictions = class_restrictions;
    this.level_requirement = level_requirement;
    this.durability = durability;
    this.primary_stats = primary_stats;
    this.effects = effects;
    this.armor = armor;
    this.equipment_slot = equipment_slot;
    this.equipment_type = equipment_type;
    this.damage_range = damage_range;
    this.swing_speed = swing_speed;
    this.dps = dps;
    this.flavor_text = flavor_text;
  }

}
