const LOADING_STATES = {
  join: 'JOIN',
  create: 'CREATE',
};

const LOADING_STATE_MESSAGES = {
  [LOADING_STATES.join]: 'Hang on, while we join you to your room ID!',
  [LOADING_STATES.create]: 'Hang on, while we create a room for you!',
};

const ERROR_STATES = {
  join: 'JOIN',
  create: 'CREATE',
};

// prettier-ignore
const ERROR_STATE_MESSAGES = {
  [ERROR_STATES.join]: 'Whoops! looks like we can\'t connect you to your room!',
  [ERROR_STATES.create]:
    'Whoa! something doesn\'t look good we can\'t create a room for you',
};

export {
  LOADING_STATES,
  LOADING_STATE_MESSAGES,
  ERROR_STATES,
  ERROR_STATE_MESSAGES,
};
