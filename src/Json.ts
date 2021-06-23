import {EncoderOpts, JsonEncoder} from "./JsonEncoder";
import {DecoderOpts, JsonDecoder} from "./JsonDecoder";
import type {Encoder} from "./encoding/encoding";
import type {Decoder} from "./encoding/decoding";

export class Json {
    private jsonEncoder: JsonEncoder;
    private jsonDecoder: JsonDecoder;

    constructor(opts: EncoderOpts & DecoderOpts = {}) {
        this.jsonEncoder = new JsonEncoder(opts);
        this.jsonDecoder = new JsonDecoder(opts);
    }

    encode(value: any, encoder?: Encoder) {
        return this.jsonEncoder.encode(value, encoder);
    }

    decode(value: Decoder | Uint8Array) {
        return this.jsonDecoder.decode(value);
    }
}
