import React from "react";

function Login({ onLogin }) {
  const initialData = {
    email: "",
    password: "",
  };
  const [data, setData] = React.useState(initialData);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData(initialData);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    onLogin(data);
    resetForm();
  };

  return (
    <div className="authorization">
      <h2 className="authorization__title">Вход</h2>
      <form
        className="authorization__form authorization__form_login "
        name="login"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          id="email"
          name="email"
          className="authorization__input authorization__input_email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          id="password"
          name="password"
          className="authorization__input authorization__input_password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <button className="authorization__button-save" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
