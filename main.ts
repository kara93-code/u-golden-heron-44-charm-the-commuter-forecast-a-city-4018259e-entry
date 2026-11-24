// u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e
// One line of weather for Drizzleford, a city that does not exist.
// Plain Node 22, no network, no input, no dependencies.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const CITY = "Drizzleford";
const SKY = "steady drizzle, 14°C";
const KIT = "umbrellas up";
const BUS = "the 8:04 bus is twenty minutes late";
const TWIST = "but the puddles arrived right on time";

function forecast(): string {
  return `Good morning, ${CITY}: ${SKY}, ${KIT} \u2014 ${BUS}, ${TWIST}.`;
}

function check(line: string): string {
  const clean = line.replace(/\s+/g, " ").trim();
  const size = [...clean].length;
  if (size < 1 || size > 140) {
    throw new Error(`forecast must be 1-140 characters, got ${size}`);
  }
  if (clean === "") {
    throw new Error("forecast must not be only white space");
  }
  if (clean.includes("  ")) {
    throw new Error("forecast must not contain double spaces");
  }
  if (!clean.includes(CITY)) {
    throw new Error("forecast must name the invented city");
  }
  const weatherWords = ["drizzle", "rain", "sun", "snow", "wind", "cloud", "fog", "storm"];
  if (!weatherWords.some((w) => clean.toLowerCase().includes(w))) {
    throw new Error("forecast must give the city weather");
  }
  if (!clean.endsWith(".")) {
    throw new Error("forecast must end with a full stop");
  }
  return clean;
}

const line = check(forecast());
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
chmodSync("/output/entry.txt", 0o644);
console.log(`wrote /output/entry.txt (${[...line].length} characters)`);
