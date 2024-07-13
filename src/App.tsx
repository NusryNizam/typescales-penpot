import { useEffect, useState } from "react";
import "./App.css";
import { generateTypeScale } from "./util";
import { PLUGIN_EVENTS, TypeScaleItem } from "./types";

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [scale, setScale] = useState(1.067);
  const [steps, setSteps] = useState(2);
  const [negativeSteps, setNegativeSteps] = useState(1);
  const [isScaleFocused, setIsScaleFocused] = useState(false);

  const [typeScales, setTypeScales] = useState<TypeScaleItem[]>([]);

  useEffect(() => {
    if (fontSize > 0 && scale > 0 && steps > 0 && negativeSteps > 0)
      setTypeScales(
        generateTypeScale(fontSize, scale, steps, negativeSteps).reverse()
      );
  }, [fontSize, scale, steps, negativeSteps]);

  const handleSubmit = () => {
    const message = {
      type: PLUGIN_EVENTS.GENERATE_TYPESCALE,
      content: typeScales,
    };
    window.parent.postMessage(message, "*");
  };

  return (
    <div>
      <div className="results">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <>
            <label htmlFor="font-size">Base Font Size</label>
            <input
              type="number"
              name="font-size"
              placeholder="fontSize"
              value={fontSize}
              onChange={(e) => {
                if (Number(e.target.value)) {
                  if (Number(e.target.value) < 0) {
                    setFontSize(16);
                    return;
                  }

                  if (Number(e.target.value) > 1000) {
                    setFontSize(1000);
                    return;
                  }

                  setFontSize(Number(e.target.value) ?? 16);
                }
              }}
            />
          </>

          <div className="form-field scale-field">
            <label htmlFor="scale">Scale</label>
            <input
              type="number"
              name="scale"
              value={scale}
              step={0.001}
              min={0}
              onFocus={() => setIsScaleFocused(true)}
              onChange={(e) => {
                if (Number(e.target.value) < 0) {
                  setScale(0);
                  return;
                }

                setScale(Number(e.target.value) ?? 1.125);
              }}
            />
            {isScaleFocused ? (
              <div className="scale-options">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.067);
                    setIsScaleFocused(false);
                  }}
                >
                  1.067 - Minor Second
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.125);
                    setIsScaleFocused(false);
                  }}
                >
                  1.125 - Major Second
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.2);
                    setIsScaleFocused(false);
                  }}
                >
                  1.200 - Minor Third
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.25);
                    setIsScaleFocused(false);
                  }}
                >
                  1.250 - Major Third
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.333);
                    setIsScaleFocused(false);
                  }}
                >
                  1.333 - Perfect Fourth
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.414);
                    setIsScaleFocused(false);
                  }}
                >
                  1.414 - Augmented Fourth
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.5);
                    setIsScaleFocused(false);
                  }}
                >
                  1.500 - Perfect Fifth
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScale(1.618);
                    setIsScaleFocused(false);
                  }}
                >
                  1.618 - Golden Ratio
                </button>
                <br />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsScaleFocused(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : null}
          </div>

          <>
            <label htmlFor="steps">Steps ↑</label>
            <input
              type="number"
              name="steps"
              min={2}
              max={20}
              step={1}
              value={steps}
              onChange={(e) => {
                if (Number(e.target.value)) {
                  if (Number(e.target.value) > 20) {
                    setSteps(20);
                    return;
                  }

                  if (Number(e.target.value) < 2) {
                    setSteps(2);
                    return;
                  }
                  setSteps(Number(e.target.value) ?? 2);
                }
              }}
            />
          </>

          <>
            <label htmlFor="steps-below">Steps ↓</label>
            <input
              type="number"
              name="steps-below"
              min={1}
              max={5}
              value={negativeSteps}
              onChange={(e) => {
                console.log(e.target.value);
                if (Number(e.target.value)) {
                  if (Number(e.target.value) > 5) {
                    setNegativeSteps(5);
                    return;
                  }

                  if (Number(e.target.value) < 1) {
                    setNegativeSteps(1);
                    return;
                  }

                  setNegativeSteps(Number(e.target.value) ?? 0);
                }
              }}
            />
          </>

          <button className="submit" type="submit">
            Generate
          </button>
        </form>

        <div className="typescale-container">
          {typeScales.map((item) => (
            <div>
              <div className="info">Font Size: {item.fontSize}px</div>
              <div
                className="typescale"
                style={{
                  fontSize: item.fontSize,
                  lineHeight: 1.2,
                  ...(fontSize === item.fontSize
                    ? {
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.086)",
                      }
                    : {}),
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
