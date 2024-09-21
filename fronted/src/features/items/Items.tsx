import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { selectItems, selectLoading } from "./itemsSlice";
import { useEffect } from "react";
import { fetchByCategory, fetchItems } from "./itemsThunks";
import OneItem from "./Components/OneItem";
import { Grid, Typography } from "@mui/material";
import Preloader from "../../Preloader/Preloader";
import { useParams } from "react-router-dom";
import { fetchOneCategory } from "../categories/categoryThunks";
import { selectOneCategory } from "../categories/categorySlice";

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(selectItems);
  const loading = useSelector(selectLoading);
  const category = useSelector(selectOneCategory);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchByCategory(id));
      dispatch(fetchOneCategory(id));
    } else {
      dispatch(fetchItems());
    }
  }, [dispatch, id]);

  return (
    <>
      {id ? (
        <Typography variant="h1" fontWeight="bold">
          {category?.title}
        </Typography>
      ) : (
        <Typography variant="h1" fontWeight="bold">
          Товары
        </Typography>
      )}
      <Grid container spacing={2}>
        {loading ? (
          <Preloader loading={loading} />
        ) : (
          items.map((item) => (
            <Grid item key={item._id} xs={4}>
              <OneItem item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Items;
