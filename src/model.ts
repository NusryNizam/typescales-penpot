import { PLUGIN_EVENTS, TypeScaleItem } from "./types";

export interface ThemePluginEvent {
  type: PLUGIN_EVENTS;
  content: TypeScaleItem[];
}

export type PluginMessageEvent = ThemePluginEvent;
