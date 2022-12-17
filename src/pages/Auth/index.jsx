import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import withAuth from "../../utils/withAuth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authAsync} from "../../store/mainSlice";
import { Form, Field } from 'react-final-form'

import "./Auth.css";
import FormField from "../../components/FormField";
import {validateEmail, validatePassword} from "../../utils/main";

function Auth(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTo = (page) => () => navigate(page, {replace: true});

    const formSubmitHandle = (data) => {
        dispatch(authAsync(data));
    }

    return (
        <div className="page">
            <Sidebar />
            <div className="wrapper">
                <div className="content-card auth-card">
                    <Form
                        onSubmit={formSubmitHandle}
                        render={({handleSubmit}) => (
                            <form className="auth-card__content" onSubmit={handleSubmit}>
                                <h2 className="auth-card__title">Войти</h2>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="mail@mail.ru"
                                    component={FormField}
                                    validate={validateEmail}
                                />
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Пароль"
                                    placeholder="*************"
                                    component={FormField}
                                    validate={validatePassword}
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
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default withAuth(Auth, true, "/");