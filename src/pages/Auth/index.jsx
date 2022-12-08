import Sidebar from "../../components/Sidebar";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import withAuth from "../../utils/withAuth";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {getFormData} from "../../utils/main";
import {useDispatch} from "react-redux";
import {authAsync} from "../../store/mainSlice";

import "./Auth.css";

function Auth(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTo = (page) => () => navigate(page, {replace: true});

    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(authAsync(getFormData(e.target)));
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
                            <span className="link link_secondary" onClick={navigateTo("/register")}>
                                Забыли пароль?
                            </span>
                        </div>
                        <div className="auth-card__action">
                            <Button type="submit">Войти</Button>
                        </div>
                        <div className="auth-card__register">
                            Новый пользователь? <span className="link" onClick={navigateTo("/register")}>Регистрация</span>
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

export default withAuth(Auth, true, "/");