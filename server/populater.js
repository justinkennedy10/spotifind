const { getAccessAndRefreshTokens } = require('./db/controller');
const User = require('./User');
const spotify = require('./spotify');

module.exports = {
  populateGenerationData(playlist) {
    return new Promise((resolve, reject) => {
      var newUsers = [];
  
      // For each user
      playlist.users.forEach(user => {
        console.log(user);
      });
      reject('COMPLETE!');
    });
  }
}
