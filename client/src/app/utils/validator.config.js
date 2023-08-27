export const validatorConfig = {
  email: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения",
    },
    isEmail: {
      message: "Email введен некорректно",
    },
  },
  phone: {
    isRequired: {
      message: "Телефон обязателен для заполнения",
    },
    isPhone: {
      message: "Телефон должен состоять из 11 цифр и в начале иметь +",
    },
  },
  name: {
    isRequired: {
      message: "Имя обязательно для заполнения",
    },
    min: {
      message: "Имя должено состаять миниму из 3 символов",
      value: 3,
    },
  },
  lastName: {
    isRequired: {
      message: "Фамилия обязательна для заполнения",
    },
    min: {
      message: "Фамилия должена состаять миниму из 3 символов",
      value: 3,
    },
  },
  firstName: {
    isRequired: {
      message: "Имя обязательно для заполнения",
    },
    min: {
      message: "Имя должено состаять миниму из 3 символов",
      value: 3,
    },
  },
  password: {
    isRequired: {
      message: "Пароль обязательна для заполнения",
    },
    isCapitalSymbol: {
      message: "Пароль должен содержать хотя бы одну заглавную букву",
    },
    isContainDigit: {
      message: "Пароль должен содержать хотя бы одно число",
    },
    min: {
      message: "Пароль должен состаять миниму из 8 символов",
      value: 8,
    },
  },
};

export function validateForm() {
  // Проверка поля Email
  const email = document.getElementById("email").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Пожалуйста, введите корректный Email.");
    return false;
  }

  // Проверка поля Phone
  const phone = document.getElementById("phone").value;
  const phonePattern = /^\+\d{11}$/;
  if (!phonePattern.test(phone)) {
    alert(
      "Пожалуйста, введите корректный номер телефона в формате +79994567843."
    );
    return false;
  }
}
