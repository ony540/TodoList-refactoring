export const todoRegister = async (title, content) => {
  try {
    const res = await axios.post("", {
      title,
      content,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
