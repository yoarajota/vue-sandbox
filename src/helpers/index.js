export const handleError = (ref, message) => {
  ref.value = message;
  setTimeout(() => {
    ref.value = false;
  }, 3000);
};
