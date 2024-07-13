import {
  PenpotFlexLayout,
  PenpotFrame,
  PenpotText,
} from "@penpot/plugin-types";
import type { PluginMessageEvent } from "./model";
import { TypeScaleItem } from "./types";

penpot.ui.open("Typescale Generator", `?theme=${penpot.getTheme()}`, {
  width: 800,
  height: 600,
});

function createTypescales(typescales: TypeScaleItem[]) {
  const board: PenpotFrame = penpot.createFrame();
  board.name = "Typescales";

  const flexLayout: PenpotFlexLayout = board.addFlexLayout();

  flexLayout.dir = "column";
  flexLayout.justifyContent = "start";
  flexLayout.horizontalSizing = "fit-content";
  flexLayout.verticalSizing = "fit-content";
  board.verticalSizing = "auto";
  board.horizontalSizing = "auto";
  flexLayout.rowGap = 8;
  flexLayout.columnGap = 8;
  flexLayout.dir = "column"; // this doesn't work

  for (const [index, typescale] of typescales.entries()) {
    const text: PenpotText | null = penpot.createText(
      "Quick brown fox jumps over the lazy dog"
    );

    if (text) {
      text.growType = "auto-width";
      text.fontFamily = "Work Sans";
      text.name = `Text ${index + 1}`;
      text.fontSize = typescale.fontSize.toString();
      board.appendChild(text);
    }
  }
}

penpot.ui.onMessage<PluginMessageEvent>((message) => {
  if (message.type === "GENERATE_TYPESCALE") {
    createTypescales(message.content);
  }
});
