export function concatenate(...arrays) {
    let byteLength = 0;
    for (let i = 0; i < arrays.length; i++) {
        const element = arrays[i];
        byteLength += element.byteLength;
    }
    const buffer = new ArrayBuffer(byteLength);
    const bytes = new DataView(buffer);
    let byteOffset = 0;
    for (let j = 0; j < arrays.length; j++) {
        const array = arrays[j];
        for (let k = 0; k < array.length; k++) {
            const value = array[k];
            if (array instanceof Int8Array) {
                bytes.setInt8(byteOffset, value);
                byteOffset += 1;
            }
            else if (array instanceof Int16Array) {
                bytes.setInt16(byteOffset, value);
                byteOffset += 2;
            }
            else if (array instanceof Int32Array) {
                bytes.setInt32(byteOffset, value);
                byteOffset += 4;
            }
            else if (array instanceof Uint8Array) {
                bytes.setUint8(byteOffset, value);
                byteOffset += 1;
            }
            else if (array instanceof Uint16Array) {
                bytes.setUint16(byteOffset, value);
                byteOffset += 2;
            }
            else if (array instanceof Uint32Array) {
                bytes.setUint32(byteOffset, value);
                byteOffset += 4;
            }
            else if (array instanceof Uint8ClampedArray) {
                bytes.setUint8(byteOffset, value);
                byteOffset += 1;
            }
            else if (array instanceof BigInt64Array) {
                bytes.setBigUint64(byteOffset, value);
                byteOffset += 8;
            }
            else if (array instanceof BigUint64Array) {
                bytes.setBigUint64(byteOffset, value);
                byteOffset += 8;
            }
            else if (array instanceof Float64Array) {
                bytes.setFloat64(byteOffset, value);
                byteOffset += 8;
            }
            else if (array instanceof Float32Array) {
                bytes.setFloat32(byteOffset, value);
                byteOffset += 4;
            }
        }
    }
}
