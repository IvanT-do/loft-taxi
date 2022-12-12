import React, {useEffect} from "react";
import withAuth from "../../utils/withAuth";
import TextField from "../../components/TextField";
import LogoImage from "../../components/Logo/LogoImage";
import Button from "../../components/Button";
import {fieldChangeHandle, submitFormHandler, validateCardNumber, validateCVC, validateExpire} from "../../utils/main";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileIfNotLoaded, getProfile, saveProfileAsync, setProfileValue} from "../../store/mainSlice";

import "./style.css";
import {useNavigate} from "react-router-dom";

function Profile(){
    const values = useSelector(getProfile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [disabled, setDisable] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    useEffect(() => {
        dispatch(fetchProfileIfNotLoaded());
    }, [])

    const changeValueHandle = (name, value) => {
        dispatch(setProfileValue({name, value}));
    }

    const submitHandle = (e, formData) => {
        e.preventDefault();
        setDisable(true);
        dispatch(saveProfileAsync(formData))
            .unwrap()
            .finally(() => {
                setDisable(false);
                setSaved(true);
            })
    }

    const goToMap = () => {
        navigate("/");
    }

    return (
        <div className="backdrop">
            <form className="content-card profile" onSubmit={submitFormHandler(submitHandle)}>
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
                                    <TextField
                                        label="Имя владельца"
                                        name="cardName"
                                        id="cardName"
                                        size="small"
                                        onChange={fieldChangeHandle(changeValueHandle)}
                                        value={values.cardName}
                                        disabled={disabled}
                                    />
                                    <TextField
                                        label="Номер карты"
                                        name="cardNumber"
                                        id="cardNumber"
                                        size="small"
                                        onChange={fieldChangeHandle(changeValueHandle, validateCardNumber)}
                                        value={values.cardNumber}
                                        disabled={disabled}
                                    />
                                    <div className="profile__subgrid">
                                        <TextField
                                            label="MM/YY"
                                            name="expiryDate"
                                            id="expiryDate"
                                            size="small"
                                            onChange={fieldChangeHandle(changeValueHandle, validateExpire)}
                                            value={values.expiryDate}
                                            disabled={disabled}
                                        />
                                        <TextField
                                            label="CVC"
                                            name="cvc"
                                            id="cvc"
                                            size="small"
                                            onChange={fieldChangeHandle(changeValueHandle, validateCVC)}
                                            value={values.cvc}
                                            disabled={disabled}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="card">
                                        <div className="card__top">
                                            <LogoImage size="small" />
                                            { values.expiryDate }
                                        </div>
                                        <div className="card__number">
                                            {
                                                (values.cardNumber || "0000 ".repeat(4).trim()).split(" ").map((item, index) => <span key={item + index}>{item}</span>)
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
        </div>
    );
}

export default withAuth(Profile)