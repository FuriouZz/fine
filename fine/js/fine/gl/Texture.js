// https://github.com/plepers/nanogl/blob/develop/texture.js
export class Texture {
    constructor(gl, type = 5121 /* UNSIGNED_BYTE */, format = 6407 /* RGB */, internal = 6407 /* RGB */) {
        this.gl = gl;
        this.type = type;
        this.format = format;
        this.internal = internal;
        this.id = -1;
        this.width = 0;
        this.height = 0;
        this.id = Texture.INDEX++;
        this.texture = this.gl.createTexture();
    }
    bind() {
        this.gl.bindTexture(3553 /* TEXTURE_2D */, this.texture);
    }
    from_image(image) {
        this.width = image.width;
        this.height = image.height;
        this.gl.bindTexture(3553 /* TEXTURE_2D */, this.texture);
        this.gl.texImage2D(3553 /* TEXTURE_2D */, 0, this.internal, this.format, this.type, image);
    }
    from_data(width, height, data) {
        this.width = width;
        this.height = height;
        this.gl.bindTexture(3553 /* TEXTURE_2D */, this.texture);
        this.gl.texImage2D(3553 /* TEXTURE_2D */, 0, this.internal, width, height, 0, this.format, this.type, data);
    }
    from_compressed(width, height, data) {
        this.width = width;
        this.height = height;
        this.gl.bindTexture(3553 /* TEXTURE_2D */, this.texture);
        this.gl.compressedTexImage2D(3553 /* TEXTURE_2D */, 0, this.internal, width, height, 0, data);
    }
    dispose() {
        this.gl.deleteTexture(this.texture);
        this.texture = null;
    }
    filter(smooth, mipmap, miplinear) {
        var filter = 9728 /* NEAREST */ | smooth | mipmap << 8 | (mipmap & miplinear) << 1;
        this.gl.texParameteri(3553 /* TEXTURE_2D */, 10240 /* TEXTURE_MAG_FILTER */, 9728 /* NEAREST */ | smooth);
        this.gl.texParameteri(3553 /* TEXTURE_2D */, 10241 /* TEXTURE_MIN_FILTER */, filter);
    }
    wrap(wrap) {
        this.gl.texParameteri(3553 /* TEXTURE_2D */, 10242 /* TEXTURE_WRAP_S */, wrap);
        this.gl.texParameteri(3553 /* TEXTURE_2D */, 10243 /* TEXTURE_WRAP_T */, wrap);
    }
    clamp() { this.wrap(33071 /* CLAMP */); }
    mirror() { this.wrap(33648 /* MIRROR */); }
    repeat() { this.wrap(10497 /* REPEAT */); }
}
Texture.INDEX = -1;
