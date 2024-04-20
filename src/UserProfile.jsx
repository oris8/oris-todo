import React, { useState } from "react";
import styles from "./UserProfile.module.css";

import MOCK_IMAGE from "./assets/mock_user.jpeg";

const INIT_CLICK_STATE = {
  name: false,
  bio: false,
};

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "UserName",
    bio: "",
    image: MOCK_IMAGE,
  });

  const [isDoubleClicked, setIsDoubleClicked] = useState(INIT_CLICK_STATE);

  const handleInputChange = (type, e) => {
    const value = e.target.value;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [type]: value,
    }));
  };
  const handleImageUpload = () => {
    const input = document.querySelector("input[type='file']");
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDoubleClick = (e) => {
    const type = e.target.parentNode.className;
    setIsDoubleClicked(() => ({
      ...INIT_CLICK_STATE,
      [type]: true,
    }));
  };

  const handleInputBlur = () => {
    setIsDoubleClicked(INIT_CLICK_STATE);
  };

  return (
    <div className={styles.userProfile}>
      <label htmlFor="image" className={styles.imageLabel}>
        <img src={profile["image"]} alt="User Image" />
        <button>
          <i className="add-circle-fill"></i>
        </button>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
        />
      </label>

      <div>
        <div className="name">
          {isDoubleClicked["name"] ? (
            <input
              type="text"
              name="name"
              value={profile["name"]}
              onChange={(e) => handleInputChange("name", e)}
              onBlur={handleInputBlur}
              className={styles.userNameInput}
            />
          ) : (
            <span className={styles.userName} onDoubleClick={handleDoubleClick}>
              {profile["name"]}
            </span>
          )}
        </div>
        <div className="bio">
          {isDoubleClicked["bio"] ? (
            <input
              type="text"
              name="bio"
              value={profile["bio"]}
              onChange={(e) => handleInputChange("bio", e)}
              onBlur={handleInputBlur}
              className={styles.userBioInput}
            />
          ) : (
            <div className={styles.userBio} onDoubleClick={handleDoubleClick}>
              {profile["bio"] || "프로필에 자기소개를 입력해보세요"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
