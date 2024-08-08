import React, { useState } from "react";
import classNames from "classnames";
import Button from "../Button/Button";
import Title from "../Title/Title";
import style from "./ProfileExit.module.css";
import ProfileExitModal from "../ProfileExitModal/ProfileExitModal";

export default function ProfileExit() {
  const [openExitModal, setOpenExitModal] = useState(false);

  const handleExitClick = () => setOpenExitModal((prev) => !prev);

  return (
    <div className={classNames(style.profile_exit, style.profile_bg_border)}>
      <Button
        title={"Выйти из аккаунта"}
        className={style.profile_exit__button}
        onClick={handleExitClick}
      />
      <p className={style.profile_exit__text}>
        Вы выйдите из своего аккаунта, но сможете продолжить пользоваться
        приложением. Вся персональная информация сохранится и будет снова
        доступна после входа
      </p>
      {openExitModal && (
        <ProfileExitModal onClose={() => setOpenExitModal(false)} />
      )}
    </div>
  );
}
