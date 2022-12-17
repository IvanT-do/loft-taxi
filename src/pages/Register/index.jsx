import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import withAuth from "../../utils/withAuth";
import {useNavigate} from "react-router-dom";
import {validateEmail, validatePassword} from "../../utils/main";
import {useDispatch} from "react-redux";
import {registerAsync} from "../../store/mainSlice";
import {Form, Field} from "react-final-form";
import FormField from "../../components/FormField";

import "./Register.css";

function Register() {
    const navigate = useNavigate();
    const navigateTo = (page) => () => navigate(page, {replace: true});
    const dispatch = useDispatch();

    const formSubmitHandle = (data) => {
        dispatch(registerAsync(data));
    }

    const validateName = (value = "") => value.trim().length > 2 ? "" : "Введите имя"

    return (
        <div className="page">
            <Sidebar/>
            <div className="wrapper">
                <div className="content-card register-card">
                    <Form
                        onSubmit={formSubmitHandle}
                        render={({handleSubmit}) => (
                            <form className="register-card__content" onSubmit={handleSubmit}>
                                <h2 className="register-card__title">Регистрация</h2>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email*"
                                    placeholder="mail@mail.ru"
                                    component={FormField}
                                    validate={validateEmail}
                                />
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Как вас зовут?*"
                                    placeholder="Петр Александрович"
                                    component={FormField}
                                    validate={validateName}
                                />
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Придумайте пароль*"
                                    placeholder="*************"
                                    component={FormField}
                                    validate={validatePassword}
                                />
                                <div className="register-card__action">
                                    <Button type="submit">Зарегистрироваться</Button>
                                </div>
                                <div className="register-card__auth">
                                    Уже зарегистрированы?
                                    <span
                                        className="link"
                                        onClick={navigateTo("/auth")}
                                    >
                                        Войти
                                    </span>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default withAuth(Register, true, "/");