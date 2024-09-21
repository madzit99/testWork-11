import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import { Container, Grid, Typography } from "@mui/material";
import OneItem from "./features/items/Components/OneItem";
import Items from "./features/items/Items";
import NavBar from "./UI/NavBar/NavBar";

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={2}>
              <NavBar />
            </Grid>
            <Grid item lg={10}>
              <Routes>
                <Route path="/" element={<Items />} />
                <Route path="/category/:id" element={<Items />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="*"
                  element={<Typography variant="h1">Not found</Typography>}
                />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default App;
