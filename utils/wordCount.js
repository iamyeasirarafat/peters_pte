const wordCount = (words, type) => {
  let count = words.filter((item) => item[1] === type);
  return count.length;
};
export default wordCount;
