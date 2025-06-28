import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    peach: "#ffcdb8",
    cream: "#fdeecf",
    olive: "#c8c696",
    sage: "#97bea9",
    espresso: "#37260c",
    footerBg: "#5C4033",
  },
};

const styles = {
  global: {
    "html, body, #root": {
      height: "100%",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
  },
};

export const theme = extendTheme({ colors, styles });
