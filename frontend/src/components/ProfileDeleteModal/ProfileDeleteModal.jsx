import React from "react";
import style from "./ProfileDeleteModal.module.css";
import Title from "../Title/Title";

const ProfileDeleteModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal_overlay}>
      <div className={style.modal_window}>
        <div className={style.modal_top_content}>
          <Title
            className={style.modal_title}
            children={"Удалить аккаунт?"}
          />
          <button className={style.close_button} onClick={onClose}>
            <img src="/Cross.svg" alt="Cross" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileDeleteModal;
