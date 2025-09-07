let logger: {
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

try {
  // tenta importar o pino
  const pino = require("pino");
  logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  });
} catch (e) {
  // fallback para console.log se pino não estiver instalado
  logger = {
    info: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug,
  };
}

export { logger };
