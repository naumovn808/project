import React from "react";
import axios from "axios";
import ProfileCropperModal from "../ProfileCropperModal/ProfileCropperModal";
import style from "./ProfilePicture.module.css";
import classNames from "classnames";

const ProfilePicture = () => {
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(null);

  React.useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImage(savedImage);
      setPreview(savedImage);
    }
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedImage) => {
    setPreview(croppedImage);
    axios
      .post("http://localhost:3000/upload", { file: croppedImage })
      .then((response) => {
        localStorage.setItem("profileImage", response.data.filePath);
        setImage(response.data.filePath);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке изображения:", error);
      });
  };

  const handleDelete = () => {
    localStorage.removeItem("profileImage");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className={classNames(style.profile_picture, style.profile_bg_border)}>
      <div className={style.profile_picture_avatar_content}>
        <img
          src={preview || "/default-avatar.svg"}
          alt="ok"
          className={style.profile_picture__image}
        />
        {!preview && (
          <div className={style.profile_picture__text}>
            Пока вы не выбрали свое удачное фото, мы заняли для него местечко
            прикольной картинкой
          </div>
        )}
      </div>
      <div className={style.profile_picture__upload}>
        <button className={style.profile_picture__button}>
          <label
            htmlFor="upload-button"
            className={style.profile_picture__upload_label}
          >
            <img src="/Camera.svg" alt="camera" />
            <span>Сменить фото</span>
          </label>
        </button>
        <input
          id="upload-button"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={style.profile_picture__upload_input}
        />
        {preview && (
          <button
            className={style.profile_picture__delete_button}
            onClick={handleDelete}
          >
            <img src="/Trash.svg" alt="Trash" />
            Удалить
          </button>
        )}
      </div>
      <ProfileCropperModal
        isOpen={modalOpen}
        imageSrc={imageSrc}
        onClose={() => setModalOpen(false)}
        onCrop={handleCrop}
      />
    </div>
  );
};

export default ProfilePicture;
