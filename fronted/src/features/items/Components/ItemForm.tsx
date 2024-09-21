import React, { useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { ItemMutation } from "../../../types";
import { useAppSelector } from "../../../app/hooks";
import { selectCategories } from "../../categories/categorySlice";
import FileInput from "../../../UI/FileInput/FileInput";

interface Props {
  onSubmit: (mutation: ItemMutation) => void;
}

const ItemForm: React.FC<Props> = ({ onSubmit }) => {
  const categories = useAppSelector(selectCategories);

  const [state, setState] = useState<ItemMutation>({
    title: "",
    description: "",
    category: "",
    image: null,
    price: "",
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.image) {
      alert("Предоставьте изображение!");
      return;
    }
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      const parsedValue = parseFloat(value);

      if (parsedValue < 0) {
        console.error("Цена не может быть ниже 0!");
        alert("Цена не может быть ниже 0!");
      } else {
        setState((prevState) => {
          return { ...prevState, [name]: value };
        });
      }
    } else {
      setState((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Заголовок"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="Описание"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Изображение"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item container xs spacing={2}>
          <Grid item xs>
            <TextField
              id="price"
              label="Цена"
              type="number"
              value={state.price}
              onChange={inputChangeHandler}
              name="price"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              select
              id="category"
              label="Категория"
              value={state.category}
              onChange={inputChangeHandler}
              name="category"
              required
            >
              <MenuItem value="" disabled>
                Пожалуйста, выберите категорию
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;
