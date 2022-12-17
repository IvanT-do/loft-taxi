import React, {useEffect} from "react";
import withAuth from "../../utils/withAuth";
import LogoImage from "../../components/Logo/LogoImage";
import Button from "../../components/Button";
import {validateCardNumber, validateCVC, validateExpire} from "../../utils/main";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProfileIfNotLoaded,
    getProfile,
    saveProfileAsync,
    setProfileCard
} from "../../store/mainSlice";
import {useNavigate} from "react-router-dom";
import {Form, Field} from "react-final-form";
import FormField from "../../components/FormField";


import "./style.css";

function Profile(){
    const values = useSelector(getProfile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [disabled, setDisable] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    useEffect(() => {
        dispatch(fetchProfileIfNotLoaded());
    }, [])

    const formSubmitHandle = (formData) => {
        setDisable(true);
        dispatch(saveProfileAsync(formData))
            .unwrap()
            .then((data) => {
                if(data?.success){
                    dispatch(setProfileCard(formData));
                    setSaved(true);
                }
            })
            .finally(() => {
                setDisable(false);
            })
    }

    const goToMap = () => {
        navigate("/");
    }

    const lengthValidate = (length, equals = false) => (value = "") => {
        if(equals){
            return value.trim().length === length ? "" : `Длина должна быть равна ${length}`;
        }
        return value.trim().length >= length ? "" : `Минимальная длина ${length} символов`;
    }

    return (
        <div className="backdrop">
            <Form
                onSubmit={formSubmitHandle}
                initialValues={values}
                render={({handleSubmit, form: {getFieldState}}) => (
                    <form className="content-card profile" onSubmit={handleSubmit}>
                        <div className="profile__title">
                            Профиль
                        </div>
                        {
                            !saved && (
                                <>
                                    <div className="profile__subtitle">
                                        Введите платежные данные
                                    </div>
                                    <div className="profile__grid">
                                        <div>
                                            <Field
                                                label="Имя владельца"
                                                name="cardName"
                                                id="cardName"
                                                size="small"
                                                disabled={disabled}
                                                component={FormField}
                                                validate={lengthValidate(5)}
                                            />
                                            <Field
                                                label="Номер карты"
                                                name="cardNumber"
                                                id="cardNumber"
                                                size="small"
                                                format={validateCardNumber}
                                                disabled={disabled}
                                                component={FormField}
                                                validate={lengthValidate(19, true)}
                                            />
                                            <div className="profile__subgrid">
                                                <Field
                                                    label="MM/YY"
                                                    name="expiryDate"
                                                    id="expiryDate"
                                                    size="small"
                                                    format={validateExpire}
                                                    disabled={disabled}
                                                    component={FormField}
                                                    validate={lengthValidate(5, true)}
                                                />
                                                <Field
                                                    label="CVC"
                                                    name="cvc"
                                                    id="cvc"
                                                    size="small"
                                                    format={validateCVC}
                                                    disabled={disabled}
                                                    component={FormField}
                                                    validate={lengthValidate(3, true)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="card">
                                                <div className="card__top">
                                                    <LogoImage size="small" />
                                                    { getFieldState("expiryDate")?.value }
                                                </div>
                                                <div className="card__number">
                                                    {
                                                        (getFieldState("cardNumber")?.value || "0000 ".repeat(4).trim()).split(" ").map((item, index) => <span key={item + index}>{item}</span>)
                                                    }
                                                </div>
                                                <div className="card__footer">
                                                    <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.5 26.5H17.5V4.5H29C29.1667 3.33333 28.5 0.8 24.5 0H11.5V26.5Z" fill="#E1E1E1"/>
                                                        <path d="M3 0H9V4.5H0C0 3.33333 0.6 0.8 3 0Z" fill="#E1E1E1"/>
                                                        <path d="M3 26H9V21.5H0C0 22.6667 0.6 25.2 3 26Z" fill="#E1E1E1"/>
                                                        <path d="M26 26H20V21.5H29C29 22.6667 28.4 25.2 26 26Z" fill="#E1E1E1"/>
                                                        <path d="M0 6.5H9V11.5H0V6.5Z" fill="#E1E1E1"/>
                                                        <path d="M20 6.5H29V11.5H20V6.5Z" fill="#E1E1E1"/>
                                                        <path d="M0 13.5H9V18.5H0V13.5Z" fill="#E1E1E1"/>
                                                        <path d="M20 13.5H29V18.5H20V13.5Z" fill="#E1E1E1"/>
                                                    </svg>

                                                    <svg width="46" height="28" viewBox="0 0 46 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g style={{ mixBlendMode: "multiply" }}>
                                                            <circle cx="14" cy="14" r="14" fill="#F1F1F1"/>
                                                        </g>
                                                        <g style={{ mixBlendMode: "multiply" }}>
                                                            <circle cx="32" cy="14" r="14" fill="#F1F1F1"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile__action">
                                        <Button type="submit" disabled={disabled}>
                                            Сохранить
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                        {
                            saved && (
                                <>
                                    <div className="profile__subtitle">
                                        Платёжные данные обновлены. Теперь вы можете заказывать такси.
                                    </div>
                                    <div className="profile__action">
                                        <Button onClick={goToMap}>
                                            Перейти на карту
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                    </form>
                )}
            />
        </div>
    );
}

export default withAuth(Profile)