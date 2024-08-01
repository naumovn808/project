import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import ProfileDeleteModal from "../../components/ProfileDeleteModal/ProfileDeleteModal";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import ProfileResetPassword from "../../components/ProfileResetPassword/ProfileResetPassword";
import ProfileMainInfo from "../../components/ProfileMainInfo/ProfileMainInfo";
import ProfileExit from "../../components/ProfileExit/ProfileExit";
import Header from "../../components/Auth_Header/Auth_Header";
import Footer from "../../components/Auth_Footer/Auth_Footer";
import Button from "../../components/Button/Button";
import Description from "../../components/Description/Description";
import ProfileMessageModal from "../../components/ProfileMessageModal/ProfileMessageModal";
import classNames from "classnames";
import style from "./ProfileForm.module.css";

const ProfileForm = ({ userId }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  let userEmail = "yury.papa@gmail.com";

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        // Axios
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };
    fetchUserImage();
  }, [userId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleResetPassword = () => setIsResetPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, surname, nickname, email } = formData;

    if (!name || !surname || !nickname || !email) {
      setError("Основная информация не может быть пустой");
      return;
    }
  };

  return (
    <>
      <Header />
      <ProfileMessageModal />
      <div className={style.profile_container}>
        <Title className={style.profile_top_title}>Изменение профиля</Title>
        <div className={style.profile}>
          <div className={style.profile_mobile_delete}>
            <div
              className={classNames(
                style.profile_details_block__delete,
                style.profile_details_block,
                style.profile_bg_border
              )}
            >
              <Button
                className={style.profile_delete_btn}
                title={"Удалить аккаунт"}
                onClick={handleOpenModal}
              />
              <Description
                className={style.profile_delete_desc}
                children={
                  "После подтверждения мы удалим всю информацию о вас, забудем, какие коктейли вы сохранили и что есть в вашем баре. Повторно зарегистрироваться на тот же email не получится"
                }
              />
            </div>
          </div>
          <div className={style.profile_mobile_delete}>
            <ProfileDeleteModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
          <ProfileExit />
          <ProfileMainInfo />
          <div className={style.profile_details_block}>
            <ProfilePicture />
            <div
              className={classNames(
                style.profile_details_block,
                style.profile_details_block__reset,
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
                <div className={style.profile_reset_password_text}>
                  <img src="/Success.svg" alt="Success" />
                  <p>{`Отправили ссылку для смены пароля на ${userEmail}`}</p>
                </div>
              )}
              {isResetPassword && (
                <ProfileResetPassword
                  isOpen={isResetPassword}
                  onClose={handleResetPassword}
                />
              )}
            </div>
            <div
              className={classNames(
                style.profile_details_block__delete,
                style.profile_details_block,
                style.profile_bg_border
              )}
            >
              <Button
                className={style.profile_delete_btn}
                title={"Удалить аккаунт"}
                onClick={handleOpenModal}
              />
              {handleOpenModal && (
                <ProfileDeleteModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
              )}
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
      <Footer />
    </>
  );
};

export default ProfileForm;
