import React from "react";
import styles from "./ImageInput.module.css";
import ImageCarousel from "./ImageCarousel/ImageCarousel";

const ImageInput = ({
  src,
  alt,
  showAddBtn = false,
  className,
  label,
  state,
  setState,
  multiple = false,
}) => {
  const handleImageUpload = (e) => {
    const targetFiles = e.target.files;
    const files = Array.from(targetFiles);

    files.map((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        multiple
          ? setState((prevState) => ({
              ...prevState,
              images: [...prevState.images, reader.result],
            }))
          : setState((prevState) => ({
              ...prevState,
              image: reader.result,
            }));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <label htmlFor={label} className={`${styles.imageLabel} ${className}`}>
      {multiple ? (
        <ImageCarousel slides={state.images} />
      ) : (
        <img src={src} alt={alt} />
      )}
      {showAddBtn && (
        <button>
          <i className="add-circle-fill"></i>
        </button>
      )}
      <input
        type="file"
        id={label}
        name={label}
        onChange={handleImageUpload}
        multiple={multiple}
      />
    </label>
  );
};

export default ImageInput;
