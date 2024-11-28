const crypto = require("crypto");
const secret = crypto.createHash("md5").update("cebety").digest("hex");

module.exports = {
    secret
}