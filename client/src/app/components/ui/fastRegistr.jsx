import * as React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { removeCount } from "../../store/catalog";
import { Copyright } from "./footer";
import TextField from "../common/form/textField";
import { validator } from "../../utils/ validator";
import { validatorConfig } from "../../utils/validator.config";
import { removeAllObject } from "../../utils/basket.localStorage";
import { createOrder } from "../../store/orders";

const defaultTheme = createTheme();

const FastLogin = ({ setModalShow, basket }) => {
  const totalProducts = [];
  const dispatch = useDispatch();
  // const basket = useSelector(getBasket());
  basket.map((item) => totalProducts.push(item));

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = React.useState({});

  const handleChange = (target) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  React.useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = validator(formData, validatorConfig);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(formErrors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    const data = {
      ...formData,
      _id: nanoid(),
      product: totalProducts,
    };
    dispatch(createOrder(data));
    removeAllObject();
    dispatch(removeCount());
    setModalShow(true);
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
                    label="Имя"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={formErrors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Фамилия"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={formErrors.lastName}
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
                    value={formData.email}
                    onChange={handleChange}
                    error={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Телефон для связи в формате +7**"
                    type="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={formErrors.phone}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-bs-dismiss="modal"
                disabled={!isValid}
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
};

FastLogin.propTypes = {
  setModalShow: PropTypes.func,
  basket: PropTypes.array,
};

export default FastLogin;
