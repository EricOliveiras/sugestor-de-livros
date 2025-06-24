import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    peach: "#ffcdb8",
    cream: "#fdeecf",
    olive: "#c8c696",
    sage: "#97bea9",
    espresso: "#37260c",
  },
};

// ADICIONE ESTA PARTE PARA OS ESTILOS GLOBAIS
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

// Passe o novo objeto de estilos para o extendTheme
export const theme = extendTheme({ colors, styles });
