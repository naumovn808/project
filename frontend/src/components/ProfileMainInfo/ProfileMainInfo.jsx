import React, { useState } from "react";
import Title from "../Title/Title";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "./ProfileMainInfo.module.css";
import ProfileMessageModal from "../ProfileMessageModal/ProfileMessageModal";
import axios from "axios";

export default function ProfileMainInfo({ userId }) {
  const [errorField, setErrorField] = useState({});
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isIcon, setIsIcon] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [formData, setFormData] = useState({
    newName: "",
    surName: "",
    nickName: "",
    newEmail: "",
  });
  const navigate = useNavigate();

  const validateInfo = ({ newName, surName, nickName, newEmail }) => {
    const errors = {};
    const cyrillicRegex = /[а-яё]/i;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (field, value, fieldName) => {
      if (value.trim() === "") {
        errors[field] = `${fieldName} Заполнение обязательно`;
      } else if (value.length < 8) {
        errors[field] = `${fieldName} Не менее 8 символов`;
      } else if (cyrillicRegex.test(value)) {
        errors[field] = `${fieldName} не должен содержать символов кириллицы`;
      }
    };

    if (newName.trim() !== "") {
      validateField("newName", newName, "Имя");
    }

    if (surName.trim() !== "") {
      validateField("surName", surName, "Фамилия");
    }

    validateField("nickName", nickName, "Никнейм");

    if (!emailRegex.test(newEmail)) {
      errors.newEmail = "Неверный формат email";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateInfo(formData);
    setErrorField(errors);

    if (Object.keys(errors).length === 0) {
      handleUpdateUserAccount();
    }
  };

  const handleUpdateUserAccount = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        {
          name: formData.newName,
          email: formData.newEmail,
          nickName: formData.nickName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("Аккаунт успешно обновлен.");
        setIsIcon("/Success.svg");
        setMessageColor("#1CCA90");
        navigate(0);
      } else {
        setMessage("Ошибка при обновлении аккаунта. Попробуйте еще раз.");
        setIsIcon("/Danger.svg");
        setMessageColor("#FF4F42");
      }
    } catch (error) {
      setMessage("Попробуйте еще раз");
      setIsIcon("/Danger.svg");
      setMessageColor("#FF4F42");
      console.error("Error updating account user: ", error);
    }

    setShowMessageModal(true);
  };

  return (
    <div
      className={classNames(style.profile_main_info, style.profile_bg_border)}
    >
      <ProfileMessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        message={message}
        isIcon={isIcon}
        messageColor={messageColor}
      />
      <Title
        children={"Основная информация"}
        className={style.profile_main_info__title}
      />
      <form className={style.profile_main_info__form} onSubmit={handleSubmit}>
        <label className={style.profile_main_info__label}>
          Имя
          <Input
            name="newName"
            value={formData.newName}
            onChange={handleChange}
            className={style.profile_main_info__label__input}
          />
          <span className={classNames(style.profile_main_info__label__span)}>
            Не обязательно
          </span>
          {errorField.newName && (
            <span className={style.error_message}>{errorField.newName}</span>
          )}
        </label>
        <label className={style.profile_main_info__label}>
          Фамилия
          <Input
            name="surName"
            value={formData.surName}
            onChange={handleChange}
            className={style.profile_main_info__label__input}
          />
          <span className={classNames(style.profile_main_info__label__span)}>
            Не обязательно
          </span>
          {errorField.surName && (
            <span className={style.error_message}>{errorField.surName}</span>
          )}
        </label>
        <label className={style.profile_main_info__label}>
          Никнейм
          <Input
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
            className={style.profile_main_info__label__input}
          />
          {errorField.nickName && (
            <span className={style.error_message}>{errorField.nickName}</span>
          )}
        </label>
        <label className={style.profile_main_info__label}>
          Email
          <Input
            id="email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            className={style.profile_main_info__label__input}
          />
          {errorField.newEmail && (
            <span className={style.error_message}>{errorField.newEmail}</span>
          )}
        </label>
        <Button title={"Сохранить изменения"} type="submit" />
      </form>
    </div>
  );
}
