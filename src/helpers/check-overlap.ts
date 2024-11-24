const checkOverlap = (elementA: Element, elementB: Element): boolean => {
  const reactA = elementA.getBoundingClientRect();
  const reactB = elementB.getBoundingClientRect();

  return !(
    reactA.right <= reactB.left ||
    reactA.left >= reactB.right ||
    reactA.bottom <= reactB.top ||
    reactA.top >= reactB.bottom
  );
};

export default checkOverlap;
