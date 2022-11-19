import Sidebar from "../../components/Sidebar/Sidebar";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

import  "./Register.css";

export default function Register({ onNavigate }){

    const navigateTo = (page) => () => onNavigate(page);

    const submitHandle = (e) => {
        e.preventDefault();
        onNavigate("home");
    }

    return (
        <div className="page">
            <Sidebar />
            <div className="wrapper">
                <div className="content-card register-card">
                    <form className="register-card__content" onSubmit={submitHandle}>
                        <h2 className="register-card__title">Регистрация</h2>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email*"
                            placeholder="mail@mail.ru"
                        />
                        <TextField
                            id="name"
                            name="name"
                            type="text"
                            label="Как вас зовут?*"
                            placeholder="Петр Александрович"
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Придумайте пароль*"
                            placeholder="*************"
                        />
                        <div className="register-card__action">
                            <Button type="submit">Зарегистрироваться</Button>
                        </div>
                        <div className="register-card__auth">
                            Уже зарегистрированы? <span className="link" onClick={navigateTo("auth")}>Войти</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}