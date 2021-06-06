const DESCRIPTION = [
  'Лето в Париже',
  'Веселые выходные',
  'А вы так можете?',
  'Когда деревья были большими...',
  'Великолепная пятерка',
  'Зацените мой лук!',
  'Сестра, где хиджаб?',
  'Не могу не поделиться',
  'Однажды в Мексике',
  'Самый лучший день приходил вчера',
  'С днем рождения меня!',
];

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_NAME = [
  'Карла',
  'Стефани',
  'Кирилл',
  'Володар',
  'Багратион',
  'Василиса',
  'Роман',
  'Аврора',
];

const AVATAR_PATH = 'img/avatar-';
const PHOTOS_PATH = 'photos/';
const SIMILAR_POSTS_COUNT = 25;
const SIMILAR_COMMENTS_COUNT = 6;

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const CommentAvatarsCount = {
  MIN: 1,
  MAX: 6,
};

function getRandomPositiveInteger (first, second) {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getOneOrTwoRandomArrayElements = function (elements) {
  const sortedElements = elements.sort(() => 0.5 - Math.random());
  const twoElememts = sortedElements.slice(0, getRandomPositiveInteger(1, 2));
  return twoElememts;
};

const createComment = function (elem, index) {
  return {
    id: index + 1,
    avatar: `${AVATAR_PATH + (getRandomPositiveInteger(CommentAvatarsCount.MIN, CommentAvatarsCount.MAX))}.svg`,
    message: getOneOrTwoRandomArrayElements(COMMENTS_MESSAGE),
    name: getRandomArrayElement(COMMENTS_NAME),
  };
};

const createPost = function (elem, index) {
  const similarComments = new Array(getRandomPositiveInteger(0, SIMILAR_COMMENTS_COUNT)).fill(null).map(createComment);
  return {
    id: index + 1,
    url: `${PHOTOS_PATH + (index + 1)}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositiveInteger(LikesCount.MIN, LikesCount.MAX),
    comments: similarComments,
  };
};

const createSimilarPosts = function () {
  return new Array(SIMILAR_POSTS_COUNT).fill(null).map(createPost);
};

createSimilarPosts();
//console.log(createSimilarPosts());
