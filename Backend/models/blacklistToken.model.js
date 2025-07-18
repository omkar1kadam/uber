const moongoose  = require('mongoose')

const blacklistTokenSchema = new moongoose.Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 } // 24 hours TTL
});

module.exports = moongoose.model('BlacklistToken', blacklistTokenSchema);