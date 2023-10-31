export const deleteTodo = async function ({ _id } = {}) {
  try {
    console.log('CLICKED')
    const response = confirm("정말 삭제하시겠습니까?")

    if (response === true) {
    console.log(response)
    const res = await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
    console.log(res.data)
    return res
  }
  } catch (err) {
    console.error("삭제 오류 발생", err);
  }
};
