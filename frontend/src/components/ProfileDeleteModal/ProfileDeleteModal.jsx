import React, { useEffect } from "react";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import style from "./ProfileDeleteModal.module.css";

const ProfileDeleteModal = ({ isOpen, onClose }) => {
  const [hidePassword, setHidePassword] = React.useState("password");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    setHidePassword(isPasswordVisible ? "text" : "password");
  }, [isPasswordVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!isOpen) return null;
  return (
    <div className={style.modal_overlay}>
      <div className={style.modal_window}>
        <div className={style.modal_top_content}>
          <Title className={style.modal_title} children={"Удалить аккаунт?"} />
          <button className={style.close_button} onClick={onClose}>
            <img src="/Cross.svg" alt="Cross" />
          </button>
        </div>

        <div className={style.profile_modal_content}>
          <ul className={style.profile_modal_content__lists}>
            <li className={style.profile_modal_content__list}>
              Вот что мы удалим:
            </li>
            <li className={style.profile_modal_content__list}>
              <img
                className={style.profile_modal_content_check}
                src="/Check.svg"
                alt="Check"
              />
              всю информацию о вас,
            </li>
            <li className={style.profile_modal_content__list}>
              <img
                className={style.profile_modal_content_check}
                src="/Check.svg"
                alt="Check"
              />
              ваши сохраненные коктейли,
            </li>
            <li className={style.profile_modal_content__list}>
              <img
                className={style.profile_modal_content_check}
                src="/Check.svg"
                alt="Check"
              />
              игредиенты в вашем баре.
            </li>
            <li className={style.profile_modal_content__list}>
              Повторно зарегистрироваться на тот же email не получится.
            </li>
          </ul>
          <form className={style.profile_modal_form}>
            <label className={style.profile_modal_label}>
              Для подтверждения введите пароль от аккаунта
            </label>
            <Input
              required
              name="password"
              type={hidePassword}
              isEyeVisible={true}
              defaultEye={true}
              showPassword={setIsPasswordVisible}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className={style.modal_buttons}>
          <Button
            onClick={onClose}
            title={"Не удалять"}
            className={style.profile_modal_button}
          />
          <Button
            title={"Да, удалить"}
            className={style.profile_modal_button}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDeleteModal;
