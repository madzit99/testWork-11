import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { selectUser } from "../../users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createItem } from "../itemsThunks";
import { Container, Typography } from "@mui/material";
import ItemForm from "./ItemForm";

interface Props {
  title: string;
  description: string;
  category: string;
  image: File | null;
  price: string;
}

const CreateNewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (ItemMutation: Props) => {
    try {
      await dispatch(createItem(ItemMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container
      sx={{
        bgcolor: "#fff",
        pt: "30px",
        pb: "30px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4">Создать новый пост</Typography>
      <ItemForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default CreateNewItem;
