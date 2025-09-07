import { left, right, Either } from "./index";

describe("Either Monad", () => {
  it("deve criar um Left corretamente", () => {
    const value = "Erro aqui";
    const result = left(value);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.l).toBe(true);
    expect(result.r).toBe(false);
    expect(result.value).toBe(value);
  });

  it("deve criar um Left sem log se autoLog=false", () => {
    const value = "Erro sem log";
    const result = left(value, false);

    expect(result.isLeft()).toBe(true);
  });

  it("deve criar um Right corretamente", () => {
    const value = 42;
    const result = right(value);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.l).toBe(false);
    expect(result.r).toBe(true);
    expect(result.value).toBe(value);
  });

  it("map em Right deve aplicar a função", () => {
    const result = right(2)
      .map((x) => x * 2)
      .map((x) => x + 6);

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(10);
  });

  it("map em Left deve aplicar a função (transformando o erro)", () => {
    const result = left("Erro inicial").map((x) => `Novo erro: ${x}`);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe("Novo erro: Erro inicial");
  });
});
