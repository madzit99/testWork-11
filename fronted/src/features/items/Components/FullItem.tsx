import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { selectUser } from "../../users/usersSlice";
import { selectLoading, selectOneItem } from "../itemsSlice";
import { deleteItem, fetchOneItem } from "../itemsThunks";
import Preloader from "../../../Preloader/Preloader";
import { API_URL } from "../../../constants";

const FullItem = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const item = useAppSelector(selectOneItem);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    if (id) {
      await dispatch(deleteItem(id));
      navigate(-1);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOneItem(id));
    }
  }, [id, dispatch]);

  let itemImage;

  if (item?.image) {
    itemImage = API_URL + "/" + item.image;
  }
  return (
    <Card sx={{ border: "3px solid black", borderRadius: "10px" }}>
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <>
          <CardMedia
            component="img"
            height="500"
            image={itemImage}
            alt={item?.title}
          />
          <CardContent>
            <Typography variant="h3">
              <span style={{ fontWeight: "bold" }}>{item?.price}</span> СОМ
            </Typography>
            <Typography variant="h2" fontWeight="bold">
              {item?.title}
            </Typography>
            <Typography variant="h5">
              Категория: {item?.category?.title}
            </Typography>
            <Typography variant="h4">{item?.description}</Typography>
            <Box mt={2}>
              <Typography variant="h3">Контакты:</Typography>
              <Typography variant="h5">
                Имя: {item?.user.displayName}
              </Typography>
              <Typography variant="h5">
                Номер телефона: {item?.user.phoneNumber}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleGoBack}>
              Назад
            </Button>
            {user?._id === item?.user?._id && (
              <Button variant="contained" onClick={handleDelete}>
                Удалить товар
              </Button>
            )}
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default FullItem;
