import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import { Typography } from "@mui/material";
import OneItem from "./features/items/Components/OneItem";
import Items from "./features/items/Items";

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="*"
          element={<Typography variant="h1">Not found</Typography>}
        />
      </Routes>
    </>
  );
};

export default App;
