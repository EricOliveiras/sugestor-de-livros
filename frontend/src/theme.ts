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

const fonts = {
  heading: "'Lora', serif", // A fonte Lora será usada para todos os componentes <Heading>
  body: "'Lato', sans-serif", // A fonte Lato será usada para todo o resto (<Text>, <Button>, etc.)
};

export const theme = extendTheme({ colors, styles, fonts });
