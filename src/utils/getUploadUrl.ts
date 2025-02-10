const getUploadUrl = (url: string) => {
  return `${import.meta.env.VITE_API_URL}/${url}`;
};

export default getUploadUrl;
