import { BoxType } from "../context/game.context";

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export const toStringHexColor = (color: number[]) => {
  return (
    componentToHex(color[0]) +
    componentToHex(color[1]) +
    componentToHex(color[2])
  );
};

export const toNumbersRGBColor = (color: string) => {
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  return [r, g, b];
};

export const replaceItemColor = (
  items: BoxType[],
  position: string,
  color: string
) => {
  return items.map((item) => {
    if (item.position === position) {
      return {
        ...item,
        color,
      };
    }
    return item;
  });
};

export const getInitGameBox = (width: number, height: number) => {
  let gameBox: BoxType[] = [];
  for (let row = 0; row < height + 2; row++) {
    for (let col = 0; col < width + 2; col++) {
      if (
        (row === 0 && col === 0) ||
        (col === width + 1 && row === 0) ||
        (col === 0 && row === height + 1) ||
        (col === width + 1 && row === height + 1)
      ) {
        gameBox.push({
          position: `${col}-${row}`,
          type: "empty",
          color: "000000",
          closest: false,
        });
      } else if (
        col === 0 ||
        col === width + 1 ||
        row === 0 ||
        row === height + 1
      ) {
        gameBox.push({
          position: `${col}-${row}`,
          type: "source",
          color: "000000",
          closest: false,
        });
      } else if (row === 1 && col === 1) {
        gameBox.push({
          position: `${col}-${row}`,
          type: "tile",
          color: "000000",
          closest: true,
        });
      } else {
        gameBox.push({
          position: `${col}-${row}`,
          type: "tile",
          color: "000000",
          closest: false,
        });
      }
    }
  }

  return gameBox;
};

export const getDifferenceTargetColorPercent = (
  targetColor: number[],
  closestColor: number[]
) => {
  return (
    (1 / 255) *
    (1 / Math.sqrt(3)) *
    Math.sqrt(
      Math.pow(targetColor[0] - closestColor[0], 2) +
        Math.pow(targetColor[1] - closestColor[1], 2) +
        Math.pow(targetColor[2] - closestColor[2], 2)
    ) *
    100
  ).toFixed(2);
};

export const getShinedColor = (
  sourcesColors: BoxType[],
  postion: string,
  width?: number,
  height?: number
) => {
  if (width && height) {
    const index = postion.split("-");
    const topSourceColor = sourcesColors.filter(
      (source) => source.position === `${index[0]}-0`
    )[0].color;

    const leftSourceColor = sourcesColors.filter(
      (source) => source.position === `0-${index[1]}`
    )[0].color;

    const bottomSourceColor = sourcesColors.filter(
      (source) => source.position === `${index[0]}-${height + 1}`
    )[0].color;

    const rightSourceColor = sourcesColors.filter(
      (source) => source.position === `${width + 1}-${index[1]}`
    )[0].color;

    const topDistance = +index[1];
    const leftDistance = +index[0];
    const bottomDistance = height + 1 - +index[1];
    const rightDistance = width + 1 - +index[0];

    const topShinedColor = toNumbersRGBColor(topSourceColor).map(
      (value: number) => value * ((height + 1 - topDistance) / (height + 1))
    );
    const leftShinedColor = toNumbersRGBColor(leftSourceColor).map(
      (value: number) => (value * (width + 1 - leftDistance)) / (width + 1)
    );
    const rightShinedColor = toNumbersRGBColor(rightSourceColor).map(
      (value: number) => (value * (width + 1 - rightDistance)) / (width + 1)
    );
    const bottomShinedColor = toNumbersRGBColor(bottomSourceColor).map(
      (value: number) => (value * (height + 1 - bottomDistance)) / (height + 1)
    );

    const r =
      topShinedColor[0] +
      leftShinedColor[0] +
      rightShinedColor[0] +
      bottomShinedColor[0];
    const g =
      topShinedColor[1] +
      leftShinedColor[1] +
      rightShinedColor[1] +
      bottomShinedColor[1];
    const b =
      topShinedColor[2] +
      leftShinedColor[2] +
      rightShinedColor[2] +
      bottomShinedColor[2];

    const f = 255 / Math.max(r, g, b, 255);

    const resultArray = [
      Math.round(r * f),
      Math.round(g * f),
      Math.round(b * f),
    ];

    return toStringHexColor(resultArray);
  }
  return "000000";
};
