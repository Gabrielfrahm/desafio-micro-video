import { deepFreeze } from "./object";

describe("Object Unit Test", () => {
  it("should not freeze a scalar value", () => {
    let arrange = [
      { received: "a", expected: "string" },
      { received: true, expected: "boolean" },
      { received: false, expected: "boolean" },
      { received: 5, expected: "number" },
    ];

    arrange.forEach((item) => {
      const str = deepFreeze(item.received);
      expect(typeof str).toBe(item.expected);
    });
  });

  it("should be a immutable object", () => {
    const obj = deepFreeze({
      prop1: "value 1",
      deep: { prop2: "value 2", prop3: new Date() },
    });
    expect(() => {
      (obj as any).prop1 = "test";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );
  });
});
