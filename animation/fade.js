export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export const fadeWithLeave = (isLeaving = false) => ({
  initial: { opacity: 0 },
  animate: isLeaving ? { opacity: 0 } : { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1 },
});