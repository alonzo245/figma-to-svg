"use client";
import { useEffect, useState } from "react";

export default function Main() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [childSvg, setChildSvg] = useState("");
  const [color, setColor] = useState("red");
  const [text1, setText1] = useState("CHANGE ME :)");
  const [textColor1, setTextColor1] = useState("white");
  const [skewY, setSkewY] = useState(0);
  const [skewX, setSkewX] = useState(0);

  const naturalW = 547; // original SVG width
  const naturalH = 547; // original SVG height

  useEffect(() => {
    fetch(`${basePath}/assets/flag-banner-group.svg`)
      .then((res) => res.text())
      .then((txt) => {
        // replace *any* fill attribute in the svg
        const updated = txt.replace(/fill="[^"]*"/g, `fill="${color}"`);
        setChildSvg(updated);
      });
  }, [color]); // refetch/re-process when color changes

  const targetW = 200; // px
  const targetH = 150; // px

  return (
    <div>
      <svg viewBox="0 0 313 650" className="w-[313px] h-[650px]">
        <image href={`${basePath}/assets/iPhone-12-Pro-Max.png`} x="0" y="0" />

        <g
          transform={`
            translate(20, 40)
            scale(${targetW / naturalW}, ${targetH / naturalH})
          `}
          dangerouslySetInnerHTML={{ __html: childSvg }}
        />
        <text
          x="50%"
          y="480"
          textAnchor="middle"
          fontSize="24"
          dominantBaseline="middle"
          fill={textColor1}
          transform={`skewX(${skewX}) skewY(${skewY})`}
        >
          {text1}
        </text>
      </svg>

      <p>Chane banners color</p>
      <button
        className="b-2 bg-[#fff] p-2 m-2"
        onClick={() => setColor("blue")}
      >
        Blue
      </button>
      <button className="b-2 bg-[#fff] p-2" onClick={() => setColor("green")}>
        Green
      </button>
      <p>Chage Text</p>
      <input
        type="text"
        value={text1} // controlled by state
        onChange={(e) => setText1(e.target.value)} // update state
        className="border p-2 rounded"
      />
      <br />
      <p>Skew text</p>
      <input
        type="range"
        max="100"
        value={skewY}
        min="0"
        onChange={(e) => setSkewY(+e.target.value)} // update state
        className="border p-2 rounded"
      />
      <input
        type="range"
        max="100"
        value={skewX}
        min="0"
        onChange={(e) => setSkewX(+e.target.value)} // update state
        className="border p-2 rounded"
      />
    </div>
  );
}
