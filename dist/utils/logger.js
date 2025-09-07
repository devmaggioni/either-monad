"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
let logger;
try {
    // tenta importar o pino
    const pino = require("pino");
    exports.logger = logger = pino({
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
            },
        },
    });
}
catch (e) {
    // fallback para console.log se pino não estiver instalado
    exports.logger = logger = {
        info: console.log,
        error: console.error,
        warn: console.warn,
        debug: console.debug,
    };
}
//# sourceMappingURL=logger.js.map