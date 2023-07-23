"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (type, user) => (0, jsonwebtoken_1.sign)({
    userId: user.id,
}, type === 'accessToken'
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: type === 'accessToken' ? '15s' : '60m',
});
exports.createToken = createToken;
//# sourceMappingURL=Auth.js.map