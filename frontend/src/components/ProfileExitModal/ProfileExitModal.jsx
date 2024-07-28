import React from "react";
import style from "./ProfileExitModal.module.css";
import Title from "../Title/Title";
import classNames from "classnames";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function ProfileExitModal({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      //   await fetch("/auth/", {
      //     method: "POST",
      //     credentials: "include",
      //   });

      localStorage.removeItem("userToken");

      navigate("/auth/register");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className={style.profile_exit_modal}>
      <div
        className={classNames(
          style.profile_exit_modal__content,
          style.profile_bg_border
        )}
      >
        <div className={style.profile_exit_modal__content_top}>
          <Title
            children={"Предупреждение"}
            className={style.profile_exit_modal__content_top_title}
          />
          <button
            className={style.profile_exit_modal__close_button}
            onClick={onClose}
          >
            <img src="/Cross.svg" alt="Cross" />
          </button>
        </div>
        <div className={style.profile_exit_modal__content_header}>
          <p className={style.profile_exit_modal__content_header__text}>
            После того, как вы покинете этот аккаунт, вы сможете восстановить
            ваши данные, используя вашу электронную почту.
          </p>
          <div className={style.profile_exit_modal__content_header__buttons}>
            <Button
              title={"Нет, назад"}
              onClick={onClose}
              className={style.profile_exit_modal__content_header__button}
            />
            <Button
              title={"Да, выход"}
              onClick={handleLogout}
              className={style.profile_exit_modal__content_header__button}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
