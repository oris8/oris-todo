```
import React from "react";

const TextField = ({
  name,
  state,
  setState,
  onChange,
  onBlur,
  placeholder,
}) => {
  function handleChangeValue(e) {
    onChange
      ? onChange(e)
      : setState((prevState) => ({
          ...prevState,
          [name]: e.target.value,
        }));
  }

  return (
    <>
      <textarea
        type="text"
        name={name}
        value={state[name] ?? state}
        onChange={handleChangeValue}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextField;

```

`value={state[name] || state}`로 설정시
textarea에서 플레이스홀더가 표시되지 않고, [object Object] 표시가 뜨는 현상 발생

`value={state[name] ? state : ''}`으로 수정하니까
플레이스홀더는 표시되지만, 입력값을 제대로 받지 못하는 상태가 되었다

`value={state[name] ?? state}`로 해결.

??와 || 연산자는 둘 다 JavaScript에서 사용되는 논리 연산자이지만, 약간의 차이가 있습니다.

|| 연산자 (논리 OR):
왼쪽 피연산자가 falsy 값이면 오른쪽 피연산자를 반환합니다.
왼쪽 피연산자가 truthy 값이면 왼쪽 피연산자를 반환합니다.
?? 연산자 (null 병합 연산자 또는 nullish coalescing operator):
왼쪽 피연산자가 null 또는 undefined일 때만 오른쪽 피연산자를 반환합니다.
왼쪽 피연산자가 null 또는 undefined가 아니면 왼쪽 피연산자를 반환합니다.
따라서, 두 연산자는 다음과 같은 차이점이 있습니다:

|| 연산자는 falsy 값(false, 0, '', null, undefined, NaN)을 처리할 때 사용됩니다.
?? 연산자는 null 또는 undefined일 때 사용됩니다.
두 연산자를 사용할 때 이러한 차이점을 고려하여 적절하게 선택해야 합니다. 만약 state[name] 값이 null 또는 undefined일 때만 빈 문자열을 반환하려면 ?? 연산자를 사용하는 것이 좋습니다.

## image input끼리 연결되어있다?

유저프로필이미지인풋에 이미지를 넣으면 그 이미지가 포스트 이미지 삽입시에 영향을 미치는 현상이 발생했다. 또, 포스트 이미지 자체에서는 파일을 넣어도 console로 파일리스트를 받을 때 빈배열이 들어오는 문제가 있었다.
(컴포넌트 분리전에는 정상작동했었다.)

```
// 기존코드
const handleImageUpload = (e) => {
     const input = document.querySelector("input[type='file']");
     const file = input.files;
    // console.log(file);
    const files = Array.from(targetFiles);
    console.log(targetFiles);

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
```

세상에나 쿼리셀렉터로 전체 문서에서 file input을 찾고있어서 발생하는문제였다;;

```
 const handleImageUpload = (e) => {
    const targetFiles = e.target.files;

    const files = Array.from(targetFiles);
    console.log(targetFiles);

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
```

로 해결했다.
템플릿코드를 많이 참조하다보니까 생긴 오류였다
반성하자
