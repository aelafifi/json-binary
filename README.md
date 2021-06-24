# JSON to Binary encoder/decoder

JSON from/to Binary encoding/decoding that supports the following data types:

- Constant values:
    - `undefined`
    - `null`
    - `true`
    - `false`
- Numbers:
    - Integers
    - BigInt's
    - Floats
- Strings
- Arrays
- Objects
- Sets
- Maps
- Dates

## Usage Example:

```js
import {Json} from "json-binary";

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
        set: new Set([7, 8, 9])
    },
    date: new Date()
};

const json = new Json();

const encoded = json.encode(data);

console.log(encoded);

/* Output: Uint8Array(135) [
     10,  10,   7,   3, 105, 110, 116,   4, 143, 156,   1,   7,
      5, 102, 108, 111,  97, 116,   6,  64,   9,  33, 251,  84,
     68,  45,  24,   7,   3, 115, 116, 114,   7,  13,  72, 101,
    108, 108, 111,  44,  32, 119, 111, 114, 108, 100,  33,   7,
      5, 117, 110, 100, 101, 102,   0,   7,   3, 110, 105, 108,
      1,   7,   1,  84,   2,   7,   1,  70,   3,   7,   3,  97,
    114, 114,   8,   3,   7,   1,  65,   7,   1,  66,   7,   1,
     67,   7,   3, 111,  98, 106,  10,   2,   7,   3, 109,  97,
    112,  11,   2,   4,
    ... 35 more items
] */

const decoded = json.decode(encoded);

console.log(decoded);

/* Output: {
    int: 9999,
    float: 3.141592653589793,
    str: 'Hello, world!',
    undef: undefined,
    nil: null,
    T: true,
    F: false,
    arr: [ 'A', 'B', 'C' ],
    obj: {
        map: Map(2) { 1 => 2, 3 => 4 },
        set: Set(3) { 7, 8, 9 }
    },
    date: 2020-01-02T12:34:56.789Z
} */
```
