function isRightOrder(...rest) {
  let lastElement = Infinity;
  return rest.every((el) => {
    const isLower = el < lastElement;
    lastElement = el;
    return isLower;
  });
}

export default isRightOrder;
