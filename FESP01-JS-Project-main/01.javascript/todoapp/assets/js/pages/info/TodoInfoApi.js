export const deleteTodo = async function ({ _id } = {}) {
  try {
    await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
    alert("정말 삭제하시겠습니까?");
  } catch (err) {
    console.error("삭제 오류 발생", err);
  }
};
