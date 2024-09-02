"use client";

import React, { useEffect, useRef } from "react";

const NeuralNetworkAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const updateDimensions = () => {
      svg.setAttribute("width", window.innerWidth.toString());
      svg.setAttribute("height", window.innerHeight.toString());
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create nodes
    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
    }));

    // Create connections
    const connections: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.95) {
          connections.push([i, j]);
        }
      }
    }

    // Animate
    let frame = 0;
    const animate = () => {
      frame++;

      // Animate nodes
      nodes.forEach((node, i) => {
        node.y += Math.sin((frame + i * 30) / 30) * 0.3;
        if (node.y > height) node.y = 0;
        if (node.y < 0) node.y = height;
      });

      // Update SVG
      svg.innerHTML = `
        ${connections
          .map(
            ([i, j]) => `
          <line
            x1="${nodes[i].x}"
            y1="${nodes[i].y}"
            x2="${nodes[j].x}"
            y2="${nodes[j].y}"
            class="stroke-blue-300 stroke-[0.5] opacity-10"
          />
        `
          )
          .join("")}
        ${nodes
          .map(
            (node) => `
          <circle
            cx="${node.x}"
            cy="${node.y}"
            r="${node.radius}"
            class="fill-blue-400"
          />
        `
          )
          .join("")}
      `;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
};

export default NeuralNetworkAnimation;
