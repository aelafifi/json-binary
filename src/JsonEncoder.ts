import {ValueType} from "./ValueType";
import {debug as createDebug} from "debug";
import {Encoder} from "lib0-encoding";

const debug = createDebug("json-encode");

export type EncoderOpts = {
    customEncoder?: (encoder: Encoder, value: any) => any;
};

export class JsonEncoder {
    private encoder: Encoder;
    private opts: EncoderOpts;

    constructor(opts: EncoderOpts = {}) {
        if (!opts.customEncoder) {
            opts.customEncoder = (encoder, value) => {
                this.encodeNull();
            };
        }
        this.opts = opts;
    }

    encode(value: any, encoder?: Encoder): Uint8Array {
        if (encoder) {
            this.encoder = encoder;
        } else {
            this.encoder = new Encoder();
        }
        this._encode(value);
        return this.encoder.toUint8Array();
    }

    _encode(value: any): void {
        debug("Encode", value);
        if (value === null) {
            this.encodeNull();
        } else if (value === undefined) {
            this.encodeUndefined();
        } else if (value === true) {
            this.encodeTrue();
        } else if (value === false) {
            this.encodeFalse();
        } else if (typeof value === "number") {
            this.encodeNumber(value);
        } else if (typeof value === "bigint") {
            this.encodeBigInt(value);
        } else if (typeof value === "string") {
            this.encodeString(value);
        } else if (Array.isArray(value)) {
            this.encodeArray(value);
        } else if (value instanceof Set) {
            this.encodeSet(value);
        } else if (value instanceof Map) {
            this.encodeMap(value);
        } else if (value instanceof Date) {
            this.encodeDate(value);
        } else if (typeof value === "object" && value.constructor === Object) {
            this.encodeObject(value);
        } else {
            // @ts-ignore
            this.opts.customEncoder(this.encoder, value);
        }
    }

    encodeNull() {
        debug("Encode NULL");
        this.encoder.writeUint8(ValueType.NULL);
    }

    encodeUndefined() {
        debug("Encode UNDEFINED");
        this.encoder.writeUint8(ValueType.UNDEFINED);
    }

    encodeTrue() {
        debug("Encode TRUE");
        this.encoder.writeUint8(ValueType.TRUE);
    }

    encodeFalse() {
        debug("Encode FALSE");
        this.encoder.writeUint8(ValueType.FALSE);
    }

    encodeNumber(value: number) {
        if (Number.isInteger(value)) {
            debug("Encode INTEGER", value);
            this.encoder.writeUint8(ValueType.INTEGER);
            this.encoder.writeVarInt(value);
        } else {
            debug("Encode FLOAT", value);
            this.encoder.writeUint8(ValueType.FLOAT);
            this.encoder.writeFloat64(value);
        }
    }

    encodeBigInt(value: bigint) {
        debug("Encode BIGINT", value);
        this.encoder.writeUint8(ValueType.BIGINT);
        this.encoder.writeBigUint64(value);
    }

    encodeString(value: string) {
        debug("Encode STRING", value);
        this.encoder.writeUint8(ValueType.STRING);
        this.encoder.writeVarString(value);
    }

    encodeArray(value: any[]) {
        debug("Encode ARRAY", value);
        this.encoder.writeUint8(ValueType.ARRAY);
        this.encoder.writeVarUint(value.length);
        value.forEach(item => {
            this._encode(item);
        });
    }

    encodeSet(value: Set<any>) {
        debug("Encode SET", value);
        this.encoder.writeUint8(ValueType.SET);
        this.encoder.writeVarUint(value.size);
        value.forEach(item => {
            this._encode(item);
        });
    }

    encodeObject(value: any) {
        debug("Encode OBJECT", value);
        this.encoder.writeUint8(ValueType.OBJECT);
        let keys = Object.keys(value);
        this.encoder.writeVarUint(keys.length);
        keys.forEach(key => {
            this._encode(key);
            this._encode(value[key]);
        });
    }

    encodeMap(value: Map<any, any>) {
        debug("Encode MAP", value);
        this.encoder.writeUint8(ValueType.MAP);
        this.encoder.writeVarUint(value.size);
        value.forEach((v, k) => {
            this._encode(k);
            this._encode(v);
        });
    }

    encodeDate(value: Date) {
        debug("Encode DATE", value);
        this.encoder.writeUint8(ValueType.DATE);
        // this.encoder.writeUint16(value.getTimezoneOffset());
        this.encoder.writeBigUint64(BigInt(value.getTime()));
    }
}
