# Either Monad
[![npm version](https://img.shields.io/npm/v/@devmaggioni/either-monad.svg?style=flat&color=blue)](https://www.npmjs.com/package/@devmaggioni/either-monad)


Um pacote TypeScript que implementa o padrão Either para tratamento de erros de forma funcional e type-safe.

## Instalação

```bash
npm install @devmaggioni/either-monad
# ou
yarn add @devmaggioni/either-monad
```

## Visão Geral

O Either é um tipo de dados que representa valores com dois casos possíveis: um valor de sucesso (`Right`) ou um valor de erro (`Left`). Esta implementação oferece uma alternativa funcional ao tratamento tradicional de erros com try/catch.

### Características

- **Type Safety**: Totalmente tipado com TypeScript
- **Functional Programming**: Suporte a operações funcionais como `map`
- **Auto Logging**: Logs automáticos de erros (configurável)
- **Composição**: Permite o encadeamento de operações

## API Reference

### Tipos

```typescript
type Either<L, R> = Left<L> | Right<R>
```

### Construtores

#### `left<L>(value: L, autoLog?: boolean): Either<L, never>`

Cria uma instância de `Left` representando um erro ou falha.

**Parâmetros:**
- `value`: O valor do erro
- `autoLog`: Se deve fazer log automático do erro (padrão: `true`)

#### `right<R>(value: R): Either<never, R>`

Cria uma instância de `Right` representando um sucesso.

**Parâmetros:**
- `value`: O valor de sucesso

### Métodos

#### `isLeft(): boolean`

Verifica se a instância é um `Left` (erro).

#### `isRight(): boolean`

Verifica se a instância é um `Right` (sucesso).

#### `map<T>(fn: (value) => T): Either<T, R>`

Aplica uma função ao valor encapsulado, mantendo o contexto Either.

**Comportamento:**
- `Left`: Aplica a função ao valor de erro e retorna novo `Left`
- `Right`: Aplica a função ao valor de sucesso e retorna novo `Right`

## Exemplos de Uso

### Exemplo Básico - Sucesso

```typescript
import { Either, left, right } from "@devmaggioni/either-monad";

function sayMyName(name: string, surname: string): Either<Error, string> {
  try {
    return right("Olá " + name + " " + surname);
  } catch (e) {
    return left(e as Error);
  }
}

const result = sayMyName("John", "Doe");

if (result.isRight()) {
  console.log("Sucesso:", result.value); // "Olá John Doe"
} else {
  console.log("Erro:", result.value);
}
```

### Exemplo Básico - Erro

```typescript
function errorExample(name: string, surname: string): Either<Error, string> {
  try {
    throw new Error("Ops... um erro interno ocorreu");
  } catch (e) {
    return left(e as Error);
  }
}

const result = errorExample("John", "Doe");

if (result.isLeft()) {
  console.log("Erro capturado:", result.value.message);
}
```

### Exemplo com Map (Encadeamento)

```typescript
// Para Right
const successChain = right(2)
  .map(x => x * 2)    // 4
  .map(x => x + 6);   // 10

if (successChain.isRight()) {
  console.log(successChain.value); // 10
}

// Para Left (erro passa através da cadeia)
const errorChain = left(new Error("Erro inicial"))
  .map(x => x + " processado")
  .map(x => x.toUpperCase());

if (errorChain.isLeft()) {
  console.log(errorChain.value); // Error modificado pela cadeia
}
```

### Exemplo Prático - Validação

```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

function validateUser(data: any): Either<string, User> {
  if (!data.name || typeof data.name !== 'string') {
    return left("Nome é obrigatório e deve ser uma string");
  }
  
  if (!data.email || !data.email.includes('@')) {
    return left("Email inválido");
  }
  
  if (!data.age || data.age < 0) {
    return left("Idade deve ser um número positivo");
  }
  
  return right({
    name: data.name,
    email: data.email,
    age: data.age
  });
}

// Uso
const userData = { name: "João", email: "joao@email.com", age: 25 };
const userResult = validateUser(userData);

if (userResult.isRight()) {
  console.log("Usuário válido:", userResult.value);
} else {
  console.log("Erro de validação:", userResult.value);
}
```

### Exemplo com Processamento de Dados

```typescript
function processNumber(input: string): Either<string, number> {
  const num = parseInt(input);
  
  if (isNaN(num)) {
    return left("Input não é um número válido");
  }
  
  return right(num);
}

const pipeline = (input: string): Either<string, string> => {
  return processNumber(input)
    .map(n => n * 2)
    .map(n => n + 10)
    .map(n => `Resultado: ${n}`);
};

// Teste com sucesso
const success = pipeline("5");
if (success.isRight()) {
  console.log(success.value); // "Resultado: 20"
}

// Teste com erro
const error = pipeline("abc");
if (error.isLeft()) {
  console.log(error.value); // "Input não é um número válido"
}
```

## Configuração de Log

Por padrão, instâncias de `Left` fazem log automático dos erros. Para desabilitar:

```typescript
const silentError = left(new Error("Erro silencioso"), false);
```

## Vantagens

1. **Prevenção de Exceções**: Erros são valores, não exceções
2. **Composição**: Operações podem ser encadeadas naturalmente
3. **Type Safety**: TypeScript garante que você trate ambos os casos
4. **Funcional**: Evita efeitos colaterais e mutações
5. **Legibilidade**: Código mais claro e previsível

## Padrões de Uso

### Railway Oriented Programming

O Either implementa o conceito de "Railway Oriented Programming", onde operações podem seguir dois trilhos:
- **Trilho de sucesso** (Right): Operações continuam sendo aplicadas
- **Trilho de erro** (Left): Erros são propagados automaticamente

```typescript
const result = processInput(data)
  .map(normalize)
  .map(validate)
  .map(transform)
  .map(save);
```

### Tratamento de Múltiplas Operações

```typescript
function complexOperation(input: string): Either<string, any> {
  return parseInput(input)
    .map(validateInput)
    .map(processInput)
    .map(formatOutput);
}
```

## TypeScript

Este pacote é totalmente compatível com TypeScript e fornece definições de tipos completas. Nenhuma instalação adicional de `@types` é necessária.

```typescript
// Tipos são inferidos automaticamente
const result: Either<string, number> = computeSomething();
```

## Licença

MIT

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## Suporte

Para suporte ou dúvidas, abra uma issue no repositório GitHub.
