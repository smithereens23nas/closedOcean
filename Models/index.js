require('../config/db.connection');

module.exports = {
    // This is exporting the nft model
    NFT: require('./nft_model'),
    // This is exporting the author model
    Author: require('./author_profile_model'),
    // This is exporting my user model
}

