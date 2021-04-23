import React from "react";
import { Link } from "react-router-dom";


function Register({onRegister}) {
    const initialData = {
      email: "",
      password: "",
    };
  
const [data, setData] = React.useState(initialData);
const resetForm = () => {
    setData(initialData);
  };

const handleChange = (evt) => {
    const { name, value } = evt.target;
        setData(data => ({
            ...data,
            [name]: value,
        }))
}


const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!data.email || !data.password) {
        return
    }
    onRegister(data);
    resetForm();
}


return (
    <div className="authorization">
    <form
    className="authorization__form authorization__form_register "
    name="register"
    onSubmit={handleSubmit}
    noValidate
  >
    <h2 className="authorization__title">Регистрация</h2>
    <input 
    id="email"
    name="email"
    className="authorization__input authorization__input_email"
    type="email"
    value={data.email}
    onChange={handleChange} 
    placeholder="Email"
    required/>
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
    <button 
    className="authorization__button-save" 
    type="submit">
        Зарегистрироваться
    </button>
  </form>

<div className="authorization__signin">
<p className="authorization__signin-text">Уже зарегистрированы? 
<Link to="/sign-in" className="authorization__link"> Войти</Link> </p>
</div>

</div>
)
}

export default Register;