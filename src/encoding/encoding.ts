import {encoding} from "lib0";

export class Encoder {
    constructor(private encoder: encoding.Encoder = encoding.createEncoder()) {
    }

    length(): number {
        return encoding.length(this.encoder);
    }

    toUint8Array(): Uint8Array {
        return encoding.toUint8Array(this.encoder);
    }

    writeUint8(num: number): void {
        return encoding.writeUint8(this.encoder, num);
    }

    writeUint16(num: number): void {
        return encoding.writeUint16(this.encoder, num);
    }

    writeUint32(num: number): void {
        return encoding.writeUint32(this.encoder, num);
    }

    writeUint32BigEndian(num: number): void {
        return encoding.writeUint32BigEndian(this.encoder, num);
    }

    writeVarUint(num: number): void {
        return encoding.writeVarUint(this.encoder, num);
    }

    writeVarInt(num: number): void {
        return encoding.writeVarInt(this.encoder, num);
    }

    writeVarString(str: string): void {
        return encoding.writeVarString(this.encoder, str);
    }

    writeBinaryEncoder(append: encoding.Encoder): void {
        return encoding.writeBinaryEncoder(this.encoder, append);
    }

    writeUint8Array(uint8Array: Uint8Array): void {
        return encoding.writeUint8Array(this.encoder, uint8Array);
    }

    writeVarUint8Array(uint8Array: Uint8Array): void {
        return encoding.writeVarUint8Array(this.encoder, uint8Array);
    }

    writeOnDataView(len: number): DataView {
        return encoding.writeOnDataView(this.encoder, len);
    }

    writeFloat32(num: number): void {
        return encoding.writeFloat32(this.encoder, num);
    }

    writeFloat64(num: number): void {
        return encoding.writeFloat64(this.encoder, num);
    }

    writeBigInt64(num: bigint): any {
        return encoding.writeBigInt64(this.encoder, num);
    }

    set(pos: number, num: number): void {
        return encoding.set(this.encoder, pos, num);
    }

    setUint8(pos: number, num: number): void {
        return encoding.setUint8(this.encoder, pos, num);
    }

    setUint16(pos: number, num: number): void {
        return encoding.setUint16(this.encoder, pos, num);
    }

    setUint32(pos: number, num: number): void {
        return encoding.setUint32(this.encoder, pos, num);
    }

    writeBigUint64(num: bigint): any {
        return encoding.writeBigUint64(this.encoder, num);
    }

    writeAny(data: undefined | null | number | bigint | boolean | string | {
        [x: string]: any;
    } | Array<any> | Uint8Array): any {
        return encoding.writeAny(this.encoder, data)
    }
}


