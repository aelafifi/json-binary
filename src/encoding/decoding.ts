import {decoding} from "lib0";

export class Decoder {
    constructor(public data: Uint8Array, private decoder: decoding.Decoder = decoding.createDecoder(data)) {
    }

    clone(): decoding.Decoder {
        return decoding.clone(this.decoder);
    }

    hasContent(): boolean {
        return decoding.hasContent(this.decoder);
    }

    readUint8(): number {
        return decoding.readUint8(this.decoder);
    }

    readUint16(): number {
        return decoding.readUint16(this.decoder);
    }

    readUint32(): number {
        return decoding.readUint32(this.decoder);
    }

    readUint32BigEndian(): number {
        return decoding.readUint32BigEndian(this.decoder);
    }

    readVarUint(): number {
        return decoding.readVarUint(this.decoder);
    }

    readVarInt(): number {
        return decoding.readVarInt(this.decoder);
    }

    readVarString(): string {
        return decoding.readVarString(this.decoder);
    }

    readUint8Array(len: number): Uint8Array {
        return decoding.readUint8Array(this.decoder, len);
    }

    readVarUint8Array(): Uint8Array {
        return decoding.readVarUint8Array(this.decoder);
    }

    readFloat32(): number {
        return decoding.readFloat32(this.decoder);
    }

    readFloat64(): number {
        return decoding.readFloat64(this.decoder);
    }

    readBigInt64(): any {
        return decoding.readBigInt64(this.decoder);
    }

    readBigUint64(): any {
        return decoding.readBigUint64(this.decoder);
    }

    readFromDataView(len: number): DataView {
        return decoding.readFromDataView(this.decoder, len);
    }

    readAny(): any {
        return decoding.readAny(this.decoder);
    }

    readTailAsUint8Array(): Uint8Array {
        return decoding.readTailAsUint8Array(this.decoder);
    }

    skip8(): number {
        return decoding.skip8(this.decoder);
    }

    peekUint8(): number {
        return decoding.peekUint8(this.decoder);
    }

    peekUint16(): number {
        return decoding.peekUint16(this.decoder);
    }

    peekUint32(): number {
        return decoding.peekUint32(this.decoder);
    }

    peekVarUint(): number {
        return decoding.peekVarUint(this.decoder);
    }

    peekVarInt(): number {
        return decoding.peekVarInt(this.decoder);
    }

    peekVarString(): string {
        return decoding.peekVarString(this.decoder);
    }
}
