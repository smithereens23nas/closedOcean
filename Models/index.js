require('../config/db.connection');

module.exports = {
    // This is exporting the nft model
    NFT: require('./product_model'),
    // This is exporting the author model
    Author: require('./review_model'),
    // This is exporting my user model
}