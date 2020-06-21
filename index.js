const getRandomIndexColorExludePrevIndex = (prevIndex = -1) => {
  const isPrevNotExist = prevIndex === -1;
  if (isPrevNotExist) return Math.floor(Math.random() * (colors.length - 1));

  const toLeftOfIndex = prevIndex - 1;
  const toRightOfIndex = prevIndex + 1;
  const lastIndex = colors.length - 1;
  const countIndexPrevToEnd = lastIndex - prevIndex;

  const isLeftExist = toLeftOfIndex !== -1;
  const isRightExist = toRightOfIndex !== colors.length;

  let leftRandom;
  let rightRandom;

  if (isLeftExist) leftRandom = Math.floor(Math.random() * toLeftOfIndex);
  else return toRightOfIndex + Math.floor(Math.random() * countIndexPrevToEnd);

  if (isRightExist) rightRandom = toRightOfIndex + Math.floor(Math.random() * countIndexPrevToEnd);
  else return leftRandom;

  const isLeft = Math.random() <= 0.5;

  const result = isLeft ? leftRandom : rightRandom;

  return result;
};

function getBackgroundWithColorTransition(elemClassName, colors, transitionDuration = '0.2s', delay = 100) {
  const elem = document.getElementsByClassName(elemClassName)[0];
  elem.style.transition = 'background-color ' + transitionDuration;

  const timeForSetInterval = parseFloat(transitionDuration)*1000 + delay;
  let prevIndex = getRandomIndexColorExludePrevIndex();
  setInterval(() => {
    const currentIndex = getRandomIndexColorExludePrevIndex(prevIndex);
    if (currentIndex === prevIndex) console.log('error for index ' + currentIndex);

    elem.style.backgroundColor = colors[currentIndex];
    prevIndex = currentIndex;
  }, timeForSetInterval);
}