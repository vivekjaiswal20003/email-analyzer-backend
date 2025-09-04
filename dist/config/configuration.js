"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT || '5000', 10),
    database: {
        uri: process.env.MONGO_URI || 'your mongodb connection string',
    },
});
//# sourceMappingURL=configuration.js.map