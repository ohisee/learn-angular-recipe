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
  }
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

module.exports = {
  dimension,
  updateDimension
};


