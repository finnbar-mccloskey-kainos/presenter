import assert from "node:assert/strict";
import test from "node:test";
import { getAnimationIndex, setCurrentSlide } from "../src/lib/context.ts";

test("keeps automatic ordering and groups independent between slides", () => {
    setCurrentSlide(0);
    assert.equal(getAnimationIndex("group"), 0);
    assert.equal(getAnimationIndex(), 1);
    assert.equal(getAnimationIndex("group"), 0);
    assert.equal(getAnimationIndex(), 2);

    setCurrentSlide(1);
    assert.equal(getAnimationIndex("group"), 0);
    setCurrentSlide(0);
    assert.equal(getAnimationIndex(), 0);
});

test("uses explicit orders for individual reveals and groups", () => {
    setCurrentSlide(0);
    assert.equal(getAnimationIndex(undefined, 2), 2);
    assert.equal(getAnimationIndex("group", 1), 1);
    assert.equal(getAnimationIndex("group", 1), 1);
    assert.equal(getAnimationIndex(undefined, 1), 1);
    assert.throws(() => getAnimationIndex("group", 2), /conflicting orders/);
});

test("rejects mixed ordering and invalid orders", () => {
    setCurrentSlide(0);
    getAnimationIndex();
    assert.throws(() => getAnimationIndex(undefined, 1), /either specify an order or omit it/);

    setCurrentSlide(0);
    getAnimationIndex(undefined, 1);
    assert.throws(() => getAnimationIndex(), /either specify an order or omit it/);

    for (const order of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
        setCurrentSlide(0);
        assert.throws(() => getAnimationIndex(undefined, order), /non-negative safe integer/);
    }
});
