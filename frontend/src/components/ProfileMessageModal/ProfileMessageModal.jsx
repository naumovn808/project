// import React from "react";
// import style from "./ProfileMessageModal.module.css";
// import classNames from "classnames";

// export const ProfileMessageModal = () => {
//   return (
//     <div className={style.profile_message_modal}>
//       <div className={style.profile_message_modal__content}>
//         <p className={style.profile_message_modal__content_message_color}></p>
//         <div className={style.profile_message_modal__content_icon}>
//           <img src="/Cross.svg" alt="" />
//         </div>
//         <div className={style.profile_message_modal__content_text}>
//           wertyuiokjhgf
//         </div>
//         <div className={style.profile_message_modal__content_cross}>
//           <img src="/Cross.svg" alt="Cross" />
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";

// const ProfileMessageModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Кнопка босилганда modal oynani очиш
//     setIsModalOpen(true);

//     // 10 секундлик кечикиш билан modal oynани ёпиш
//     const closeModalTimer = setTimeout(() => {
//       setIsModalOpen(false);
//     }, 10000);

//     // Компонент ёпилганда таймерни тўхтатиш
//     return () => clearTimeout(closeModalTimer);
//   }, []);

//   return (
//     <>
//       {isModalOpen && (
//         <div className="modal fade show" style={{ display: "block" }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Email o'zgardi</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>
//                   Yangi email manzilingiz uchun tasdiqlash xabari yuborildi.
//                 </p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Ok
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileMessageModal;
// MongoDB ulash

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/users", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Foydalanuvchi modeli
// const User = mongoose.model("User", {
//   name: String,
//   email: String,
//   status: String,
// });

// React component

import axios from "axios";
import React, { useState, useEffect } from "react";

const UserModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changedField, setChangedField] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);


  let getData = axios.get(``)

  useEffect(() => {
    const updateUser = async () => {
      try {
        const user = await User.findOneAndUpdate(
          { email: "user@example.com" },
          {
            name: "John Doe",
            email: "new_email@example.com",
            status: "active",
          },
          { new: true }
        );

        setChangedField(
          Object.keys(user.toObject()).find((key) => user[key] !== "John Doe")
        );
        setIsChanged(true);
        setIsModalOpen(true);

        const closeModalTimer = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime === 1) {
              setIsModalOpen(false);
              console.log("Modal yopildi");
              return 0;
            } else {
              console.log(`Vaqt qoldi: ${prevTime - 1} soniya`);
              return prevTime - 1;
            }
          }, 1000);
        });

        return () => clearInterval(closeModalTimer);
      } catch (error) {
        console.error(error);
      }
    };

    updateUser();
  }, []);

  return (
    <>
      {isModalOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Foydalanuvchi ma'lumotlari o'zgartirildi
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {isChanged ? (
                  <p>
                    {changedField} maydonida yangi qiymat:{" "}
                    {`"${User[changedField]}"`}
                  </p>
                ) : (
                  <p>Hech narsa o'zgarmadi.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserModal;
