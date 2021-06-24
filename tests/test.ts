import {Json} from "../src/Json";

class Color {
    constructor(public name) {
    }
}

describe('Check all decoded data are retrieved well.', () => {
    const data = {
        int: 9999,
        float: Math.PI,
        str: "Hello, world!",
        undef: undefined,
        nil: null,
        T: true,
        F: false,
        arr: ['A', 'B', 'C'],
        obj: {
            map: new Map([[1, 2], [3, 4]]),
            set: new Set([7, 8, 9]),
        },
        date: new Date(),
        func: function someFunction() {
        },
        custom: new Color("red"),
    };

    const functions = new Map();

    let json = new Json({
        customEncoder(encoder, value) {
            if (typeof value === "function") {
                encoder.writeUint8(100);
                const id = Math.random();
                functions.set(id, value);
                encoder.writeFloat64(id);
            } else if (value instanceof Color) {
                encoder.writeUint8(101);
                encoder.writeVarString(value.name);
            }
        },
        customDecoder(decoder, type) {
            switch (type) {
                case 100:
                    const id = decoder.readFloat64();
                    return functions.get(id);
                case 101:
                    const colorName = decoder.readVarString();
                    return new Color(colorName);
            }
        },
    });

    let encoded = json.encode(data);
    let decoded = json.decode(encoded);

    test('Main object decoded as an object.', () => {
        expect(decoded).toBeInstanceOf(Object);
    });

    test('Integers encoded and decoded correctly.', () => {
        expect(decoded.int).toBe(data.int);
    });

    test('Floats encoded and decoded correctly.', () => {
        expect(decoded.float).toBe(data.float);
    });

    test('Strings encoded and decoded correctly.', () => {
        expect(decoded.str).toBe(data.str);
    });

    test('Undefined encoded and decoded correctly.', () => {
        expect(decoded.undef).toBe(data.undef);
    });

    test('NULL encoded and decoded correctly.', () => {
        expect(decoded.nil).toBe(data.nil);
    });

    test('True encoded and decoded correctly.', () => {
        expect(decoded.T).toBe(data.T);
    });

    test('False encoded and decoded correctly.', () => {
        expect(decoded.F).toBe(data.F);
    });

    test('Arrays decoded as Array type.', () => {
        expect(decoded.arr).toBeInstanceOf(Array);
    });

    test('Arrays encoded and decoded correctly.', () => {
        expect(decoded.arr).toEqual(data.arr);
    });

    test('Objects decoded as Object type.', () => {
        expect(decoded.obj).toBeInstanceOf(Object);
    });

    test('Objects encoded and decoded correctly.', () => {
        expect(decoded.obj).toEqual(data.obj);
    });

    test('Maps decoded as Map type.', () => {
        expect(decoded.obj.map).toBeInstanceOf(Map);
    });

    test('Maps encoded and decoded correctly.', () => {
        expect(decoded.obj.map).toEqual(data.obj.map);
    });

    test('Sets decoded as Set type.', () => {
        expect(decoded.obj.set).toBeInstanceOf(Set);
    });

    test('Sets encoded and decoded correctly.', () => {
        expect(decoded.obj.set).toEqual(data.obj.set);
    });

    test('Dates decoded as Date type.', () => {
        expect(decoded.date).toBeInstanceOf(Date);
    });

    test('Dates encoded and decoded correctly.', () => {
        expect(decoded.date).toEqual(data.date);
    });

    test('Functions decoded as Function type.', () => {
        expect(decoded.func).toBeInstanceOf(Function);
    });

    test('Functions encoded and decoded correctly.', () => {
        expect(decoded.func).toBe(data.func);
    });

    test('Custom types decoded as Custom type type.', () => {
        expect(decoded.custom).toBeInstanceOf(Color);
    });

    test('Custom types encoded and decoded correctly.', () => {
        expect(decoded.custom).toEqual(data.custom);
    });
});
