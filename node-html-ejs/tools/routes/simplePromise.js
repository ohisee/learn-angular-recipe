/**
 * @fileoverview return a promise
 */

/**
 * @returns {Promise<{object}>}
 */
function getSimpleQueryResult() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        result: [
          'Something', 'prosperous', 'wonderful'
        ]
      })
    }, 2000)
  });
}

module.exports = {
  getSimpleQueryResult
};

