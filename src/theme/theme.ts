import { Theme } from "theme-ui";

export const theme: Theme = {
  text: {
    heading1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      lineHeight: "1.2",
      marginBottom: "1rem",
    },
    heading2: {
      fontSize: "2rem",
      fontWeight: "bold",
      lineHeight: "1.3",
      marginBottom: "0.75rem",
    },
    heading3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      lineHeight: "1.4",
      marginBottom: "0.5rem",
    },
    body: {
      fontSize: "1rem",
      fontWeight: "normal",
      lineHeight: "1.6",
      marginBottom: "1.5rem",
    },
    smallText: {
      fontSize: "0.875rem",
      fontWeight: "normal",
      lineHeight: "1.4",
      color: "#666",
    },
    link: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#0070f3",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  sizes: {
    container: 768,
  },
  buttons: {
    primary: {
      backgroundColor: "#0070f3", 
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#005bb5",
      },
      "&:disabled": {
        backgroundColor: "#ccc", 
        cursor: "not-allowed",
      },
    },
  },
};
