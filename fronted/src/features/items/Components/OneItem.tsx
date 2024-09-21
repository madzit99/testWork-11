import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import { Item } from "../../../types";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../../constants";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

interface Props {
  item: Item;
}

const OneItem: React.FC<Props> = ({ item }) => {
  let cardImage;

  if (item.image) {
    cardImage = API_URL + "/" + item.image;
  }
  return (
    <Card sx={{ maxWidth: 300, width: "100%", mb: "15px" }}>
      <CardMedia
        component="img"
        height="140"
        image={cardImage}
        alt="Ваше изображение"
      />
      <CardContent>
        <Link to={`/items/${item?._id}`}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {item?.title}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {item.price} СОМ
        </Typography>
      </CardContent>
    </Card>
  );
};
export default OneItem;
