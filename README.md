# 📦 Either Monad – Simples e Funcional

Uma implementação minimalista e tipada de um **Either Monad** em TypeScript, útil para modelar fluxos que podem resultar em sucesso (`Right`) ou falha (`Left`) de forma declarativa e funcional.

---

## ✨ Recursos

- **Tipagem forte** com TypeScript.
- API funcional simples (`left`, `right`, `map`, `isLeft`, `isRight`).
- **Log automático de erros** para instâncias `Left`.
- Compatível com **Node.js** e **ESM/CJS**.
- Zero dependências externas.

---

## 📥 Instalação

```bash
npm install either-monad
# ou
yarn add either-monad
```

---

## 🚀 Uso Básico

```ts
import { left, right } from "either-monad";

// Sucesso
const resultado = right(2)
  .map((x) => x * 2) // => 4
  .map((x) => x + 6); // => 10

console.log(resultado.value); // 10

// Erro
const erro = left("Algo deu errado");
// Log automático do erro
```

---

## 🛠 API

### `left(value, autoLog = true)`

Cria um objeto `Left`, representando um resultado de erro.

```ts
const erro = left("Falha", false); // Desabilita log automático
```

---

### `right(value)`

Cria um objeto `Right`, representando um resultado de sucesso.

```ts
const sucesso = right(42);
```

---

### `.isLeft()` / `.isRight()`

Métodos de checagem para distinguir os casos.

```ts
if (resultado.isRight()) {
  console.log("Sucesso:", resultado.value);
}
```

---

### `.map(fn)`

Aplica uma função ao valor interno e retorna um novo `Either`.

```ts
const novo = right(2).map((x) => x + 3); // Right(5)
```

📌 **Nota:** O `map` em `Left` mantém o fluxo funcional, permitindo transformar a informação de erro.

---

## 📄 Exemplo Completo

```ts
import { left, right } from "either-monad";

function dividir(a: number, b: number) {
  return b === 0 ? left("Divisão por zero!") : right(a / b);
}

const resultado1 = dividir(10, 2)
  .map((x) => x * 3)
  .map((x) => x.toFixed(2));

const resultado2 = dividir(10, 0);

console.log(resultado1.isRight(), resultado1.value); // true, "15.00"
console.log(resultado2.isLeft(), resultado2.value); // true, "Divisão por zero!"
```

---

## 📦 Estrutura Interna

- `Left` → Representa falha, opcionalmente loga o valor.
- `Right` → Representa sucesso.
- `Either<L, R>` → União entre `Left<L>` e `Right<R>`.

---

## 📜 Licença

[MIT](./LICENSE) — Livre para uso pessoal e comercial.
