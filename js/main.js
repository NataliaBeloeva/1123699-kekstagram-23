const POSTS_COUNT = 25;
const COMMENTS_COUNT = 6;
const AVATAR_PATH = 'img/avatar-';
const PHOTOS_PATH = 'photos/';

const DESCRIPTIONS = [
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

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Карла',
  'Стефани',
  'Кирилл',
  'Володар',
  'Багратион',
  'Василиса',
  'Роман',
  'Аврора',
];

const likesCount = {
  MIN: 15,
  MAX: 200,
};

const commentAvatarsCount = {
  MIN: 1,
  MAX: 6,
};

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getOneOrTwoRandomArrayElements = (elements) => {
  const sortedElements = elements.sort(() => 0.5 - Math.random());
  const twoElememts = sortedElements.slice(0, getRandomPositiveInteger(1, 2));
  return twoElememts;
};

const createComment = (idx) => ({
  id: idx + 1,
  avatar: `${AVATAR_PATH + (getRandomPositiveInteger(commentAvatarsCount.MIN, commentAvatarsCount.MAX))}.svg`,
  message: getOneOrTwoRandomArrayElements(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPost = (index) => {
  const similarComments = new Array(getRandomPositiveInteger(0, COMMENTS_COUNT)).fill(null).map((_, idx) => createComment(idx));
  return {
    id: index + 1,
    url: `${PHOTOS_PATH + (index + 1)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(likesCount.MIN, likesCount.MAX),
    comments: similarComments,
  };
};

const createSimilarPosts = () => new Array(POSTS_COUNT).fill(null).map((_, index) => createPost(index));

createSimilarPosts();
