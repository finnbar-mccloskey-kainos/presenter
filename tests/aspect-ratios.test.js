import assert from "node:assert/strict";
import test from "node:test";
import { getSlideAspectRatios } from "../src/lib/aspect-ratios.ts";

test("inherits the default and each declared ratio in slide order", () => {
    assert.deepEqual(
        getSlideAspectRatios([{}, {}, { aspectRatio: 4 / 3 }, {}, { aspectRatio: 1 }, {}]),
        [16 / 9, 16 / 9, 4 / 3, 4 / 3, 1, 1],
    );
});

test("rejects invalid declared ratios", () => {
    for (const aspectRatio of [0, -1, NaN, Infinity, Number.MAX_VALUE, Number.MIN_VALUE, "4/3", null]) {
        assert.throws(
            () => getSlideAspectRatios([{}, { aspectRatio }]),
            /Invalid aspectRatio on slide 2/,
        );
    }
});
