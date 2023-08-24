import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getBasket, removeCount } from "../../store/catalog";
import { Copyright } from "./footer";
import { nanoid } from "@reduxjs/toolkit";
import { removeAllObject } from "../../utils/basket.localStorage";

const defaultTheme = createTheme();

export default function FastLogin({ setModalShow }) {
  const totalProducts = [];
  const dispatch = useDispatch();
  const basket = useSelector(getBasket());
  basket.map((item) => totalProducts.push(item));
  // const [data, setData] = React.useState();
  // const isValidEmail = (email) => {
  //   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   return emailPattern.test(email);
  // };

  // const isValidPhone = (phone) => {
  //   const phonePattern = /^\+[0-9]{11}$/;
  //   return phonePattern.test(phone);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      _id: nanoid(),
      email: data.get("email"),
      phone: data.get("phone"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      product: totalProducts,
    });
    removeAllObject();
    dispatch(removeCount());
  };

  return (
    <div className="modal-body">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Имя"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Фамилия"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Телефон для связи"
                    type="phone"
                    id="phone"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-bs-dismiss="modal"
                // disabled={!isValid}
                onClick={() => setModalShow(true)}
              >
                Оформить заказ
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
