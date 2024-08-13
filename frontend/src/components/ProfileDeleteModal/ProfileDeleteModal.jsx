import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import style from "./ProfileDeleteModal.module.css";
import ProfileMessageModal from "../ProfileMessageModal/ProfileMessageModal";
import { useNavigate } from "react-router-dom";

const ProfileDeleteModal = ({ isOpen, onClose, userId }) => {
  const [hidePassword, setHidePassword] = useState("password");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [isIcon, setIsIcon] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setHidePassword(isPasswordVisible ? "text" : "password");
  }, [isPasswordVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteAccount = async () => {
    if (!formData.password) {
      setMessage("Введите пароль для удаления аккаунта.");
      setIsIcon("/Danger.svg");
      setMessageColor("#FF4F42");
      setShowMessageModal(true);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:1000/profile/delete-account/${userId}`,
        {
          data: { password: formData.password },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("Аккаунт успешно удален.");
        setError("");
        setIsIcon("/Success.svg");
        setMessageColor("#1CCA90");
        setShowMessageModal(true);
        setTimeout(() => {
          onClose();
          navigate(0);
        }, 2000);
      } else {
        setMessage("Ошибка при удалении аккаунта. Попробуйте еще раз.");
        setIsIcon("/Danger.svg");
        setMessageColor("#FF4F42");
        setShowMessageModal(true);
        navigate(0);
      }
    } catch (error) {
      setMessage("Неверный пароль.");
      setIsIcon("/Danger.svg");
      setMessageColor("#FF4F42");
      setShowMessageModal(true);
      console.error("Error deleting account:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal_overlay}>
      {showMessageModal && (
        <ProfileMessageModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          message={message}
          isIcon={isIcon}
          messageColor={messageColor}
        />
      )}
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
          <form
            className={style.profile_modal_form}
            onSubmit={(e) => {
              e.preventDefault();
              handleDeleteAccount();
            }}
          >
            <label className={style.profile_modal_label}>
              Для подтверждения введите пароль от аккаунта
            </label>
            <Input
              required
              name="password"
              type={hidePassword}
              isEyeVisible={true}
              defaultEye={true}
              showPassword={setIsPasswordVisible}
              onChange={handleChange}
              value={formData.password}
            />
            {error && <span className={style.error_message}>{error}</span>}
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
            onClick={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDeleteModal;
