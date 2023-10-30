axios.defaults.baseURL = "http://localhost:33088/api/todolist";

export const getTodo = async (_id) => {
  try {
    const res = await axios.get(`${_id}`);

    return res.data.item.content;
  } catch (error) {
    console.error(error);
  }
};

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
