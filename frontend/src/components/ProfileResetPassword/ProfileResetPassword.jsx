import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "../ProfileResetPassword/ProfileResetPassword.module.css";

export default function ProfileResetPassword({ isOpen, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorField, setErrorField] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [hidePassword, setHidePassword] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState();
  const navigate = useNavigate();

  const validatePassword = () => {
    const errors = {};
    const cyrillicRegex = /[а-яё]/i;

    if (newPassword.trim() === "") {
      errors.newPassword = "Заполнение обязательно";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Не менее 8 символов";
    } else if (cyrillicRegex.test(newPassword)) {
      errors.newPassword = "Пароль не должен содержать символов кириллицы";
    }

    if (confirmNewPassword.trim() === "") {
      errors.confirmNewPassword = "Заполнение обязательно";
    } else if (confirmNewPassword !== newPassword) {
      errors.confirmNewPassword = "Пароли не совпадают";
    }
    return errors;
  };

  useEffect(() => {
    setHidePassword(isPasswordVisible ? "text" : "password");
  }, [isPasswordVisible]);

  const changeStateEye = (e) => {
    setIsPasswordVisible(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validatePassword();
    setErrorField(errors);

    if (Object.keys(errors).length === 0) {
      const updatedUserData = {
        newPassword,
      };
      console.log("new password:", newPassword);
      navigate(0);
    }
  };

  const handleFocus = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  const handleBlur = () => {
    const errors = validatePassword();
    setErrorField(errors);
  };

  return (
    <div className={style.profile_reset_password}>
      <div
        className={classNames(
          style.profile_reset_password__content,
          style.profile_bg_border
        )}
      >
        <div className={style.profile_reset_password__top_title}>
          <Title
            children={"Новый пароль"}
            className={style.profile_reset_password__top_text}
          />
          <button
            className={style.profile_reset_password__top_btn}
            onClick={onClose}
          >
            <img src={`${process.env.PUBLIC_URL}/Cross.svg`} alt="Cross" />
          </button>
        </div>
        <form
          className={style.profile_reset_password__form}
          onSubmit={handleSubmit}
        >
          <label className={style.profile_reset_password__form_label}>
            <span>Введите новый пароль</span>
            <Input
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => handleFocus("newPassword")}
              onBlur={handleBlur}
              type={hidePassword}
              isEyeVisible={true}
              defaultEye={true}
              showPassword={changeStateEye}
              className={classNames({
                [style.error]:
                  errorField.newPassword && touchedFields.newPassword,
              })}
            />
            {errorField.newPassword && touchedFields.newPassword && (
              <span className={style.error_message}>
                {errorField.newPassword}
              </span>
            )}
          </label>
          <label className={style.profile_reset_password__form_label}>
            <span>Подтвердите новый пароль</span>
            <Input
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onFocus={() => handleFocus("confirmNewPassword")}
              onBlur={handleBlur}
              type={hidePassword}
              isEyeVisible={true}
              defaultEye={true}
              showPassword={changeStateEye}
              className={classNames({
                [style.error]:
                  errorField.confirmNewPassword &&
                  touchedFields.confirmNewPassword,
              })}
            />
            {errorField.confirmNewPassword &&
              touchedFields.confirmNewPassword && (
                <span className={style.error_message}>
                  {errorField.confirmNewPassword}
                </span>
              )}
          </label>
          {errorField.message && <span>{errorField.message}</span>}
          <Button
            className={style.profile_reset_password__form_btn}
            title={"Сохранить и войти"}
            onClose={onClose}
            type="submit"
            disabled={!newPassword || !confirmNewPassword}
          />
        </form>
      </div>
    </div>
  );
}
