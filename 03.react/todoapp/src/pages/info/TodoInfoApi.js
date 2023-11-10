export const deleteTodo = async function ({ _id } = {}) {
  try {
    // const response = confirm("정말 삭제하시겠습니까?")
    // if (response === true) {}
    const res = await axios.delete(
      `http://localhost:33088/api/todolist/${_id}`
    );
    return res;
  } catch (err) {
    console.error("삭제 오류 발생", err);
  }
};
