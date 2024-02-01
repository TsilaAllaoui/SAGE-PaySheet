import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import "./index.css";
import { routes } from "./routes";
import { theme } from "./styles/theme";
import AdminUserProvider from "./contexts/providers/AdminUserProvider";

export const StyledContainer = styled.div`
  animation: fadeIn 750ms;
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AdminUserProvider>
        <RouterProvider router={routes} />
      </AdminUserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
