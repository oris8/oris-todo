import axios from "axios";

export async function fetchData(setFunction, link) {
  try {
    const response = await axios.get(`http://localhost:5000/api/${link}`);
    setFunction(response.data);
  } catch (error) {
    console.error("데이터를 가져오는 동안 오류가 발생했습니다:", error);
  }
}

// data는 객체형식
export async function postData(link, data) {
  try {
    // POST 요청을 보낼 때 데이터를 함께 전송합니다.
    const response = await axios.post(
      `http://localhost:5000/api/${link}`,
      data
    );

    console.dir(response.data);
  } catch (error) {
    console.error("데이터를 전송하는 중 오류가 발생했습니다:", error);
  }
}

export async function updateData(link, data) {
  const id = data._id;
  console.log(data, id, "업데이트중");
  try {
    // PUT 또는 PATCH 요청을 사용하여 특정 할 일의 내용을 업데이트합니다.
    const response = await axios.patch(
      `http://localhost:5000/api/${link}/${id}`,
      data
    );

    console.dir(response.data);
  } catch (error) {
    console.error("데이터를 업데이트하는 동안 오류가 발생했습니다:", error);
  }
}

export async function deleteData(link, id) {
  try {
    // DELETE 요청을 사용하여 특정 데이터를 삭제합니다.
    const response = await axios.delete(
      `http://localhost:5000/api/${link}/${id}`
    );

    console.dir(response.data);
  } catch (error) {
    console.error("데이터를 삭제하는 동안 오류가 발생했습니다:", error);
  }
}

export async function uploadArrayFile(files, key, link) {
  const formData = new FormData();
  files.map((file) => {
    formData.append({ key }, file);
  });

  console.log(formData);

  try {
    const response = await axios.post(
      `http://localhost:5000/api/${link}`,
      formData
    );

    console.dir(response.data);
  } catch (error) {
    console.error("데이터를 파일 전송하는 중 오류가 발생했습니다:", error);
  }
}
