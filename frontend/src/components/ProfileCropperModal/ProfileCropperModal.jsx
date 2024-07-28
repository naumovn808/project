import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import PropTypes from "prop-types";
import style from "./ProfileCropperModal.module.css";

const ProfileCropperModal = ({ isOpen, imageSrc, onClose, onCrop }) => {
  const cropperRef = useRef(null);

  const handleCrop = async () => {
    const cropper = await cropperRef.current.cropper;
    onCrop(cropper.getCroppedCanvas().toDataURL());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={style.cropper_modal}>
      <div className={style.cropper_modal__content}>
        <div className={style.cropper_modal__header}>
          <h2>Закруглим?</h2>
          <button className={style.cropper_modal__close} onClick={onClose}>
            <img src="/Cross.svg" alt="Cross" />
          </button>
        </div>
        <div className={style.cropper_modal__cropper_container}>
          <Cropper
            src={imageSrc}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            aspectRatio={1}
            background={false}
            autoCropArea={1}
            cropBoxMovable={false}
            cropBoxResizable={false}
          />
        </div>
        <button className={style.cropper_modal__button} onClick={handleCrop}>
          Сохранить идеальный круг
        </button>
      </div>
    </div>
  );
};

ProfileCropperModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  imageSrc: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
};

export default ProfileCropperModal;
