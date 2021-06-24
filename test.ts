process.env.DEBUG = '*';

import {decoding, encoding} from "lib0";
import {Json} from "./src/Json";
import {uuidv4} from "lib0/random";

class Color {
    constructor(public name) {
    }
}

const data = {
    a: 1,
    b: Math.PI,
    c: [5, true, false, null, undefined],
    d: function abc() {
    },
    e: {
        [5]: "abc",
        x: new Map([[1, 2], [3, 4]]),
        y: new Set([7, 8, 9]),
    },
    t: new Date(),
    L: new Color("red"),
};

const functions = new Map();

let json = new Json({
    customEncoder(encoder, value) {
        if (typeof value === "function") {
            encoder.writeUint8(100);
            const id = uuidv4();
            functions.set(id, value);
            encoder.writeVarString(id);
        } else if (value instanceof Color) {
            encoder.writeUint8(101);
            encoder.writeVarString(value.name);
        }
    },
    customDecoder(decoder, type) {
        switch (type) {
            case 100:
                const id = decoder.readVarString();
                return functions.get(id);
            case 101:
                const colorName = decoder.readVarString();
                return new Color(colorName);
        }
    },
});

let encoded = json.encode(data);
console.log(encoded);

let decoded = json.decode(encoded);
console.log(decoded);
