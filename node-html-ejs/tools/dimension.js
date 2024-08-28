/**
 * @fileoverview dimension
 */

/**
 * @typedef {{key: string, title: string, name: string, isUp: boolean, isReady: boolean, hidden: []}} Dimension 
 */

/** @type {Dimension} */
const dimension = {
  key: 'runner',
  title: 'San Jose',
  name: 'San Mateo',
  isUp: true,
  isReady: false,
  hidden: {
    something: ['car', 'truck']
  },
  info: [
    ['field', 'geo location']
    ['type', 'float'],
    ['extra', ''],
  ]
};

/**
 * @returns {Promise<Dimension>}
 */
function updateDimension() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        ...dimension,
        isReady: true
      });
    }, 2000);
  });
}


/**
 * Generator
 */
function* yDimension() {
  yield { ...dimension };
}

module.exports = {
  dimension,
  updateDimension,
  yDimension
};


