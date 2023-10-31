axios.defaults.baseURL = "http://localhost:33088/api/todolist";

// View More 버튼 함수
export const getTodoList = async () => {
  try {
    const res = await axios.get(``);
    // const res = await axios.get(`?page=1&limit=${limit}`);

    return res.data.items.reverse();
  } catch (error) {
    console.error(error);
  }
};

export const getTotalNum = async () => {
  try {
    const res = await axios.get(`?page=1`);

    return res.data.pagination.total;
  } catch (error) {
    console.error(error);
  }
};

// content 호출 함수
export const getTodo = async (_id) => {
  try {
    const res = await axios.get(`${_id}`);

    return res.data.item.content;
  } catch (error) {
    console.error(error);
  }
};

// 완료 / 미완료 체크 박스 관리 함수
export const updateChecked = async (_id, title, content, done) => {
  try {
    const res = await axios.patch(`${_id}`, {
      title,
      content,
      done,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
