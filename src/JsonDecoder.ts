import {decoding} from "lib0";
import {ValueType} from "./ValueType";
import {debug as createDebug} from "debug";
import {Decoder} from "./encoding/decoding";

const debug = createDebug("json-decode");

export type DecoderOpts = {
    customDecoder?: (decoder: Decoder, type: number) => any;
};

export class JsonDecoder {
    private decoder: Decoder;
    private opts: DecoderOpts;

    constructor(opts: DecoderOpts = {}) {
        if (!opts.customDecoder) {
            opts.customDecoder = (decoder, type) => null;
        }
        this.opts = opts;
    }

    decode(value: Decoder | Uint8Array): any {
        if (value instanceof Uint8Array) {
            this.decoder = new Decoder(value);
        } else {
            this.decoder = value;
        }
        return this._decode();
    }

    _decode(): any {
        const type: ValueType = this.decoder.readUint8();

        switch (type) {
            case ValueType.NULL:
                debug("Found NULL");
                return null;
            case ValueType.UNDEFINED:
                debug("Found UNDEFINED");
                return undefined;
            case ValueType.TRUE:
                debug("Found TRUE");
                return true;
            case ValueType.FALSE:
                debug("Found FALSE");
                return false;
            case ValueType.INTEGER:
                debug("Found INTEGER");
                return this.decodeInteger();
            case ValueType.FLOAT:
                debug("Found FLOAT");
                return this.decodeFloat();
            case ValueType.BIGINT:
                debug("Found BIGINT");
                return this.decodeBigInt();
            case ValueType.STRING:
                debug("Found STRING");
                return this.decodeString();
            case ValueType.ARRAY:
                debug("Found ARRAY");
                return this.decodeArray();
            case ValueType.SET:
                debug("Found SET");
                return this.decodeSet();
            case ValueType.OBJECT:
                debug("Found OBJECT");
                return this.decodeObject();
            case ValueType.MAP:
                debug("Found MAP");
                return this.decodeMap();
            case ValueType.DATE:
                debug("Found DATE");
                return this.decodeDate();
            default:
                // @ts-ignore
                return this.opts.customDecoder(this.decoder, type);
        }
    }

    decodeInteger() {
        const value = this.decoder.readVarInt();
        debug("ValueType: %d", value);
        return value;
    }

    decodeFloat() {
        const value = this.decoder.readFloat64();
        debug("ValueType: %f", value);
        return value;
    }

    decodeBigInt() {
        const value = this.decoder.readBigUint64();
        debug("ValueType: %f", value);
        return value;
    }

    decodeString() {
        const value = this.decoder.readVarString();
        debug("ValueType: %s", value);
        return value;
    }

    decodeArray() {
        const len = this.decoder.readVarUint();
        debug("Len: %d", len);
        const ret: any[] = [];
        for (let i = 0; i < len; i++) {
            const value = this._decode();
            debug("ValueType %d: %s", i, value);
            ret.push(value);
        }
        return ret;
    }

    decodeSet() {
        const len = this.decoder.readVarUint();
        debug("Len: %d", len);
        const ret = new Set<any>();
        for (let i = 0; i < len; i++) {
            const value = this._decode();
            debug("ValueType %d: %s", i, value);
            ret.add(value);
        }
        return ret;
    }

    decodeObject() {
        const len = this.decoder.readVarUint();
        debug("Len: %d", len);
        const ret = {};
        for (let i = 0; i < len; i++) {
            const key = this._decode();
            const value = this._decode();
            debug("Key %d: %s", i, key);
            debug("ValueType %d: %s", i, value);
            ret[key] = value;
        }
        return ret;
    }

    decodeMap() {
        const len = this.decoder.readVarUint();
        debug("Len: %d", len);
        const ret = new Map<any, any>();
        for (let i = 0; i < len; i++) {
            const key = this._decode();
            const value = this._decode();
            debug("Key %d: %s", i, key);
            debug("ValueType %d: %s", i, value);
            ret.set(key, value);
        }
        return ret;
    }

    decodeDate() {
        // const timezone = this.decoder.readUint8();
        const timestamp: bigint = this.decoder.readBigUint64();
        const date = new Date(Number(timestamp));
        return date;
    }
}
