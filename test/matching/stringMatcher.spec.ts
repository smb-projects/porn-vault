import { StringMatcher, stripStr } from "../../src/matching/stringMatcher";
import { expect } from "chai";

import stripStrFixtures from "./fixtures/strip_string.fixture";
import matchingActorFixtures from "./fixtures/matching_actor.fixture";
import matchingLabelFixtures from "./fixtures/matching_label.fixture";

describe("matcher", () => {
  describe("String matcher", () => {
    describe("Strip string", () => {
      for (const test of stripStrFixtures) {
        it("Should work as expected", () => {
          expect(stripStr(test.source)).equals(test.expected);
        });
      }
    });

    describe("Is matching actor", () => {
      for (const test of matchingActorFixtures) {
        it(`Should ${test.expected ? "" : "not "}match ${test.actor.name}`, () => {
          const isMatch = new StringMatcher({
            ignoreSingleNames: true,
          }).isMatchingItem(test.actor, test.str, (actor) => [actor.name, ...actor.aliases]);
          expect(isMatch).to.equal(test.expected);
        });
      }
    });

    describe("Is matching label", () => {
      for (const test of matchingLabelFixtures) {
        it(`Should ${test.expected ? "" : "not "}match ${test.label.name}`, () => {
          const isMatch = new StringMatcher({ ignoreSingleNames: false }).isMatchingItem(
            test.label,
            test.str,
            (label) => [label.name, ...label.aliases]
          );
          expect(isMatch).to.equal(test.expected);
        });
      }
    });
  });
});
