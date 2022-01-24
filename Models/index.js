require('../config/db.connection');

module.exports = {
    // This is exporting the nft model
    nft: require('./nft_model'),
    // This is exporting the author model
    author: require('./author_profile_model'),
    // This is exporting my user model
}

