import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { selectItems, selectLoading } from "./itemsSlice";
import { useEffect } from "react";
import { fetchItems } from "./itemsThunks";
import OneItem from "./Components/OneItem";
import { Grid } from "@mui/material";
import Preloader from "../../Preloader/Preloader";

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(selectItems);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        items.map((item) => (
          <Grid item key={item._id} xs={3}>
            <OneItem item={item} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Items;
