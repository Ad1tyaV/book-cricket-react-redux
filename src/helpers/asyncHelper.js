export const asyncHelper = async (url) => {
  let data;

  try {
    const response = await fetch(url);
    data = await response.json();
    return [200, data];
  } catch (err) {
    return [401, "Something Went Wrong!"];
  }

  // return [200, data];
};
