import { TypeScaleItem } from "./types";

export function generateTypeScale(
  baseSize: number,
  ratio: number,
  steps: number,
  negativeSteps: number
): TypeScaleItem[] {
  const scale: TypeScaleItem[] = [];
  let fontSize = baseSize;

  for (let i = 0; i < steps; i++) {
    scale.push({
      fontSize,
    });

    fontSize = Math.round(Number((fontSize * ratio).toFixed(2)));
  }

  fontSize = baseSize;

  if (negativeSteps > 0) {
    for (let i = 0; i < negativeSteps; i++) {
      fontSize = Math.round(Number((fontSize / ratio).toFixed(2)));

      scale.unshift({
        fontSize,
      });
    }
  }

  return scale;
}
