import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ProfileDeleteModal from "../../components/ProfileDeleteModal/ProfileDeleteModal";
import Description from "../../components/Description/Description";
import axios from "axios";
import classNames from "classnames";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import ProfileResetPassword from "../../components/ProfileResetPassword/ProfileResetPassword";
import style from "./ProfileForm.module.css";

const ProfileForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [hidePassword, setHidePassword] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState();
  const [formData, setFormData] = useState();
  const [emailChanged, setEmailChanged] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setHidePassword(isPasswordVisible ? "text" : "password");
  }, [isPasswordVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeStateEye = (e) => {
    setIsPasswordVisible(e);
  };

  const handleResetPassword = () => {
    setIsResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setIsResetPassword(false);
  };

  useEffect(() => {
    const fetchUserImage = async (error) => {
      try {
        //axios
      } catch (error) {
        // console.error("Error fetching user image:", error);
      }
    };
    fetchUserImage();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !surname || !nickname || !email) {
      setError("Основная информация не может быть пустой");
      return;
    } else {
      console.log({ name, surname, nickname, email });
    }
  };

  const checkNickname = (nickname) => {
    const isNicknameTaken = nickname === "uk";
    if (isNicknameTaken) {
      setError("Такой никнейм уже занят");
    } else {
      setError("");
    }
  };

  return (
    <div className={style.profile_container}>
      <Title className={style.profile_top_title}>Изменение профиля</Title>
      <div className={style.profile}>
        <form
          onSubmit={handleSubmit}
          className={classNames(
            style.main_information,
            style.profile_bg_border
          )}
        >
          <h2 className={style.profile_form_title}>Основная информация</h2>
          <div className={style.profile_inputs}>
            <div>
              <label>Имя</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={style.profile_input}
              />
            </div>
            <div>
              <label>Фамилия</label>
              <Input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className={style.profile_input}
              />
            </div>
            <div>
              <label>Никнейм</label>
              <Input
                type="text"
                value={nickname}
                className={style.profile_input}
                onChange={(e) => {
                  setNickname(e.target.value);
                  checkNickname(e.target.value);
                }}
              />
              {error && <p className="error">{error}</p>}
            </div>
            <div>
              <label>Email</label>
              <Input
                type="email"
                value={email}
                className={style.profile_input}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailChanged(true);
                }}
              />
              {emailChanged && (
                <p>При изменении отправим ссылку для подтверждения</p>
              )}
            </div>
          </div>
          <span>
            <p>Меняем на {email}</p>
          </span>
          <Button
            className={style.asa}
            type="submit"
            title={"Сохранить изменения"}
          />
        </form>
        <div className={style.profile_details_block}>
          <ProfilePicture />
          <div
            className={classNames(
              style.profile_details_block,
              style.profile_bg_border
            )}
          >
            <Button
              className={style.profile_btn}
              title={"Сменить пароль"}
              onClick={handleResetPassword}
            />
            <Description
              className={style.profile_changer_email_text}
              children={
                "Отправим ссылку на текущий email — перейдите по ней для смены пароля"
              }
            />
            {isResetPassword && (
              <ProfileResetPassword
                isOpen={isResetPassword}
                onClose={handleCloseResetPassword}
              />
            )}
          </div>
          <div
            className={classNames(
              style.profile_details_block,
              style.profile_bg_border
            )}
          >
            <Button
              className={style.profile_delete_btn}
              title={"Удалить аккаунт"}
              onClick={handleOpenModal}
            />
            <ProfileDeleteModal isOpen={isModalOpen} onClose={handleCloseModal}>
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
                    id="password"
                    name="password"
                    type={hidePassword}
                    isEyeVisible={true}
                    defaultEye={true}
                    showPassword={changeStateEye}
                    onChange={handleChange}
                  />
                </form>
              </div>
              <div className={style.modal_buttons}>
                <Button
                  onClick={handleCloseModal}
                  title={"Не удалять"}
                  className={style.profile_modal_button}
                />
                <Button
                  title={"Да, удалить"}
                  className={style.profile_modal_button}
                />
              </div>
            </ProfileDeleteModal>
            <Description
              className={style.profile_delete_desc}
              children={
                "После подтверждения мы удалим всю информацию о вас, забудем, какие коктейли вы сохранили и что есть в вашем баре. Повторно зарегистрироваться на тот же email не получится"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
