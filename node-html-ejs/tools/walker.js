/**
 * @fileoverview Walker class
 */
class Walker {
  /**
   * @param {string} name
   * @param {number} speed 
   */
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  sayYourName() {
    console.log(this.name);
  }
}

module.exports = Walker;

