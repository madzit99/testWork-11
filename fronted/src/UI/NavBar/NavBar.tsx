import { useEffect } from "react";
import { Grid, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { selectCategories } from "../../features/categories/categorySlice";
import { fetchCategories } from "../../features/categories/categoryThunks";

const Link = styled(NavLink)({
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: "#000",
  },
});

const NavBar = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column" sx={{ mt: "40px" }}>
        <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
          <Link to={`/`}>Все</Link>
        </Typography>
        {categories.map((category) => (
          <Typography
            key={category._id}
            variant="h4"
            component="div"
            sx={{ textAlign: "center" }}
          >
            <Link to={`/category/${category._id}`}>{category.title}</Link>
          </Typography>
        ))}
      </Grid>
    </>
  );
};

export default NavBar;
