const COMMENT_MAX_LENGTH = 140;

function getRandomInteger(min, max) {
  if (min >= max || min < 0) {
    return 'Expected arguments: max > min >= 0';
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

getRandomInteger(20, 30);
getCommentLength('Не очень длинный комментарий', COMMENT_MAX_LENGTH);
