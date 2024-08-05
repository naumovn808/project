import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./ProfileMessageModal.module.css";

const ProfileMessageModal = ({
  isOpen,
  onClose,
  message,
  isIcon,
  messageColor,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (isOpen) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onClose, isIcon]);

  if (!isVisible) return null;

  return (
    <div
      className={`${style.modal} ${isVisible ? style.show : style.hide}`}
      style={{ background: messageColor }}
    >
      <div className={style.message}>
        <div className={style.icon}>
          <img src={isIcon} alt="Message Icon" />
        </div>
        <div className={style.text}>
          <p>{message}</p>
        </div>
        <button className={style.closeButton} onClick={onClose}>
          <div className={style.circularCountdown}>
            <svg className={style.circle} viewBox="0 0 36 36">
              <path
                className={style.path}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <img src="/Cross.svg" alt="Cross" />
          </div>
        </button>
      </div>
    </div>
  );
};

ProfileMessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  isIcon: PropTypes.string.isRequired,
  messageColor: PropTypes.string.isRequired,
};

export default ProfileMessageModal;
