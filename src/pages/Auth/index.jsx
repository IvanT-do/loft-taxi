import Sidebar from "../../components/Sidebar";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import {useAuth} from "../../utils/AuthProvider";
import {useEffect} from "react";
import PropTypes from "prop-types";

import "./Auth.css";

export default function Auth({ onNavigate }){
    const auth = useAuth();

    useEffect(() => {
        if(auth.isLoggedIn){
            onNavigate("home");
        }
    })

    const navigateTo = (page) => () => onNavigate(page);

    const submitHandle = (e) => {
        e.preventDefault();

        const formData = {};

        [...e.target].forEach(item => {
            if(item.name){
                formData[item.name] = item.value;
            }
        })

        const {email, password} = formData;
        auth.login(email, password);
    }

    return (
        <div className="page">
            <Sidebar />
            <div className="wrapper">
                <div className="content-card auth-card">
                    <form className="auth-card__content" onSubmit={submitHandle}>
                        <h2 className="auth-card__title">Войти</h2>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="mail@mail.ru"
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Пароль"
                            placeholder="*************"
                        />
                        <div className="auth-card__forgot">
                            <span className="link link_secondary" onClick={navigateTo("register")}>
                                Забыли пароль?
                            </span>
                        </div>
                        <div className="auth-card__action">
                            <Button type="submit">Войти</Button>
                        </div>
                        <div className="auth-card__register">
                            Новый пользователь? <span className="link" onClick={navigateTo("register")}>Регистрация</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Auth.propTypes = {
    onNavigate: PropTypes.func
}