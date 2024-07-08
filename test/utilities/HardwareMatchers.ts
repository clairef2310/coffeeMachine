import {expect} from '@jest/globals';
import type {MatcherFunction} from 'expect';
import {MachineACaféHarness} from "./MachineACaféHarness";

const aucunCaféNEstServi: MatcherFunction =
    function (actual: unknown) {
        if(!(actual instanceof MachineACaféHarness))
            throw new Error("Only works with MachineACaféHarness");

        const delta = actual.CountInvocationsMakeACoffee();
        const pass = delta == 0;
        const message = `${delta} cafés servis.`

        return {
            message: () => message,
            pass: pass
        }
    };

const unCaféEstServi: MatcherFunction =
    function (actual: unknown) {
        if(!(actual instanceof MachineACaféHarness))
            throw new Error("Only works with MachineACaféHarness");

        const delta = actual.CountInvocationsMakeACoffee();
        const pass = delta == 1;
        const message = `${delta} cafés servis.`

        return {
            message: () => message,
            pass: pass
        }
    };

const xCafésSontServis: MatcherFunction<[expected: unknown]> =
    function (actual: unknown, expected: unknown) {
        if(!(actual instanceof MachineACaféHarness))
            throw new Error("Only works with MachineACaféHarness");

        if(!Number.isInteger(expected))
            throw new Error("Only works with integer");

        const delta = actual.CountInvocationsMakeACoffee();
        const pass = delta == expected;
        const message = `${delta} cafés servis.`

        return {
            message: () => message,
            pass: pass
        }
    };

expect.extend({
    aucunCaféNEstServi,
    xCafésSontServis,
    unCaféEstServi
});