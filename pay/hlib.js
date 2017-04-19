var hlib;
(function (hlib) {
    var MD5 = (function () {
        function MD5() {
            this.hexcase = 0;
            this.b64pad = "";
            this.chrsz = 8;
        }
        /** 1 hex_MD5实现  */
        MD5.prototype.hex_md5 = function (s) {
            return this.binl2hex(this.core_md5(this.str2binl(s), s.length * this.chrsz));
        };
        MD5.prototype.b64_md5 = function (s) {
            return this.binl2b64(this.core_md5(this.str2binl(s), s.length * this.chrsz));
        };
        MD5.prototype.str_md5 = function (s) {
            return this.binl2str(this.core_md5(this.str2binl(s), s.length * this.chrsz));
        };
        MD5.prototype.hex_hmac_md5 = function (key, data) {
            return this.binl2hex(this.core_hmac_md5(key, data));
        };
        MD5.prototype.b64_hmac_md5 = function (key, data) {
            return this.binl2b64(this.core_hmac_md5(key, data));
        };
        MD5.prototype.str_hmac_md5 = function (key, data) {
            return "";
        };
        /**
         * 核心操作  03
         */
        MD5.prototype.core_md5 = function (x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return Array(a, b, c, d);
        };
        /**
         * MD5操作方法
         */
        MD5.prototype.md5_cmn = function (q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        };
        MD5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };
        MD5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };
        MD5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        };
        MD5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        };
        /**
         *
         * @param key
         * @param data
         */
        MD5.prototype.core_hmac_md5 = function (key, data) {
            var bkey = this.str2binl(key);
            if (bkey.length > 16)
                bkey = this.core_md5(bkey, key.length * this.chrsz);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.core_md5(ipad.concat(this.str2binl(data)), 512 + data.length * this.chrsz);
            return this.core_md5(opad.concat(hash), 512 + 128);
        };
        MD5.prototype.safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
        MD5.prototype.bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        };
        /** 2 */
        MD5.prototype.str2binl = function (str) {
            var bin = Array();
            var mask = (1 << this.chrsz) - 1;
            for (var i = 0; i < str.length * this.chrsz; i += this.chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / this.chrsz) & mask) << (i % 32);
            return bin;
        };
        MD5.prototype.binl2str = function (bin) {
            var str = "";
            var mask = (1 << this.chrsz) - 1;
            for (var i = 0; i < bin.length * 32; i += this.chrsz)
                str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
            return str;
        };
        /** 04 */
        MD5.prototype.binl2hex = function (binarray) {
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
            }
            return str;
        };
        MD5.prototype.binl2b64 = function (binarray) {
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i += 3) {
                var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
                    | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
                    | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32)
                        str += this.b64pad;
                    else
                        str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                }
            }
            return str;
        };
        /**
         * MD5加密内部测试
         */
        MD5.prototype.md5_vm_test = function () {
            return this.hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
        };
        /**
         * 暴露到外面的接口
         * @param v
         * @returns {string}
         */
        MD5.toMD5 = function (v) {
            var md5 = new MD5();
            return md5.hex_md5(v);
        };
        return MD5;
    }());
    hlib.MD5 = MD5;
    /**
     * ie9不兼容代码
     */
    var Base64Util = (function () {
        function Base64Util() {
        }
        Base64Util.create = function () {
            var lookup = [];
            for (var i = 0; i < Base64Util.CHARS.length; i++) {
                lookup[Base64Util.CHARS.charCodeAt(i)] = i;
            }
            return lookup;
        };
        Base64Util.encode = function (arraybuffer) {
            var bytes = new Uint8Array(arraybuffer);
            var i;
            var len = bytes.length;
            var base64 = "";
            for (i = 0; i < len; i += 3) {
                base64 += Base64Util.CHARS[bytes[i] >> 2];
                base64 += Base64Util.CHARS[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
                base64 += Base64Util.CHARS[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
                base64 += Base64Util.CHARS[bytes[i + 2] & 63];
            }
            if ((len % 3) === 2) {
                base64 = base64.substring(0, base64.length - 1) + "=";
            }
            else if (len % 3 === 1) {
                base64 = base64.substring(0, base64.length - 2) + "==";
            }
            return base64;
        };
        Base64Util.decode = function (base64) {
            var bufferLength = base64.length * 0.75;
            var len = base64.length;
            var i;
            var p = 0;
            var encoded1, encoded2, encoded3, encoded4;
            if (base64[base64.length - 1] === "=") {
                bufferLength--;
                if (base64[base64.length - 2] === "=") {
                    bufferLength--;
                }
            }
            var arraybuffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(arraybuffer);
            for (i = 0; i < len; i += 4) {
                encoded1 = Base64Util.LOOKUP[base64.charCodeAt(i)];
                encoded2 = Base64Util.LOOKUP[base64.charCodeAt(i + 1)];
                encoded3 = Base64Util.LOOKUP[base64.charCodeAt(i + 2)];
                encoded4 = Base64Util.LOOKUP[base64.charCodeAt(i + 3)];
                bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
                bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
                bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
            }
            return arraybuffer;
        };
        Base64Util.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        Base64Util.LOOKUP = Base64Util.create();
        return Base64Util;
    }());
    hlib.Base64Util = Base64Util;
    var MathUtil = (function () {
        function MathUtil() {
        }
        /** min <= value < max */
        MathUtil.rand = function (min, max) {
            if (min < max) {
                return min + Math.random() * (max - min);
            }
            return min;
        };
        /** min <= value < max */
        MathUtil.randInt = function (min, max) {
            var num = Number(MathUtil.rand(min, max));
            return Math.floor(num);
        };
        /**
         * 获取小数点后位数
         */
        MathUtil.lenDigit = function (value) {
            var str = value.toString();
            var index = str.indexOf(".");
            if (index >= 0)
                return str.length - index - 1;
            return 0;
        };
        /**
         * 小数点右边格式化输出
         */
        MathUtil.fixedRight = function (value, digits) {
            if (digits === void 0) { digits = 0; }
            var i;
            var tn = Math.pow(10, digits);
            var str = (Math.round(value * tn) / tn).toString();
            var index = str.indexOf(".");
            var len = 0;
            if (index >= 0) {
                len = str.substr(index + 1).length;
            }
            else if (digits > 0) {
                str += ".";
            }
            for (i = 0; i < digits - len; i++) {
                str += "0";
            }
            return str;
        };
        MathUtil.fixed = function (value, digits) {
            if (digits === void 0) { digits = 0; }
            /*
             Test cases:
             trace(hlib.MathUtil.Fixed(123.456, 0), "123");
             trace(hlib.MathUtil.Fixed(123.4, 2), "123.40");
             trace(hlib.MathUtil.Fixed(123, 2), "123.00");
             trace(hlib.MathUtil.Fixed(123.456, 2), "123.46");
             trace(hlib.MathUtil.Fixed(123.4549, 2), "123.45");
             trace(hlib.MathUtil.Fixed(123.4544, 2), "123.45");
             trace(hlib.MathUtil.Fixed(12345.4544, -1), "12350");
             trace(hlib.MathUtil.Fixed(12345.4544, -2), "12300");
             Output:
             123 123
             123.40 123.4
             123.00 123
             123.46 123.46
             123.45 123.45
             123.45 123.45
             12350 12350
             12300 12300

             */
            if (isNaN(digits))
                digits = 0;
            if (digits >= 0)
                return MathUtil.fixedRight(value, digits);
            else {
                var p = Math.pow(10, Math.abs(digits));
                value = value / p;
                var num = Math.floor(Number(MathUtil.fixedRight(value, 0)) * p);
                var str = num.toString();
                var index = str.indexOf(".");
                if (index >= 0)
                    str = str.substr(0, index);
                return str;
            }
        };
        /**
         * 四舍五入
         */
        MathUtil.round = function (value, digits) {
            if (digits === void 0) { digits = 0; }
            return Number(MathUtil.fixed(value, digits));
        };
        /**
         * 向下取整
         */
        MathUtil.floor = function (value, digits) {
            if (digits === void 0) { digits = 0; }
            if (isNaN(digits))
                digits = 0;
            var p = Math.pow(10, Math.abs(digits));
            if (digits >= 0) {
                value = Math.floor(value * p);
                return value / p;
            }
            else {
                value = Math.floor(value / p);
                return value * p;
            }
        };
        /**
         * 向上取整
         */
        MathUtil.ceil = function (value, digits) {
            if (digits === void 0) { digits = 0; }
            if (isNaN(digits))
                digits = 0;
            var p = Math.pow(10, Math.abs(digits));
            if (digits >= 0) {
                value = Math.ceil(value * p);
                return value / p;
            }
            else {
                value = Math.ceil(value / p);
                return value * p;
            }
        };
        MathUtil.isPercentage = function (value) {
            return value.indexOf("%") >= 0;
        };
        MathUtil.getPercentScale = function (value) {
            var scale;
            var index = value.indexOf("%");
            if (index >= 0)
                scale = Number(value.substring(0, index));
            else
                scale = Number(value);
            return scale / 100;
        };
        /**
         * 求余数，解决精度问题
         */
        MathUtil.mod = function (num1, num2) {
            var digits = MathUtil.lenDigit(num2);
            var p = Math.pow(10, digits);
            var num = (num1 * p) % (num2 * p);
            return num / p;
        };
        MathUtil.angle2Radian = function (a) {
            return a * Math.PI / 180;
        };
        MathUtil.radian2Angle = function (r) {
            return r * 180 / Math.PI;
        };
        return MathUtil;
    }());
    hlib.MathUtil = MathUtil;
    var ConvertUtil = (function () {
        function ConvertUtil() {
        }
        ConvertUtil.isBoolean = function (val) {
            return typeof val === "boolean";
        };
        ConvertUtil.isNumber = function (val) {
            return typeof val === "number";
        };
        ConvertUtil.isString = function (val) {
            return typeof val === "string";
        };
        ConvertUtil.isObject = function (val) {
            if (!val)
                return false;
            return typeof val === "object" && val.constructor === Object;
        };
        ConvertUtil.isDate = function (val) {
            return val instanceof Date;
        };
        ConvertUtil.isArray = function (val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        };
        ConvertUtil.isArrayBuffer = function (val) {
            return Object.prototype.toString.call(val) === "[object ArrayBuffer]";
        };
        ConvertUtil.toBytes = function (utfstr) {
            var buf = new ArrayBuffer(utfstr.length * 2);
            var bufView = new Uint16Array(buf);
            var len = utfstr.length;
            for (var i = 0; i < len; i++) {
                bufView[i] = utfstr.charCodeAt(i);
            }
            return buf;
        };
        ConvertUtil.toString = function (val) {
            if (val == null)
                return "";
            var type = typeof val;
            if (type === "boolean" || type === "string" || type === "number")
                return val.toString();
            else if (ConvertUtil.isDate(val))
                return ConvertUtil.formatDate(val, "yyyy-mm-dd hh:mm:ss");
            else if (ConvertUtil.isArrayBuffer(val))
                return String.fromCharCode.apply(null, new Uint16Array(val));
            return val.toString();
        };
        //英寸（相当于 2。54 厘米，一英尺有 12 英寸）（
        ConvertUtil.cmToInches = function (value) {
            return value / 2.54;
        };
        ConvertUtil.mmToInches = function (value) {
            return value / 25.4;
        };
        //1 像素 = 1 磅 = 1/72 英寸 = 20 缇 (twip)
        //1 英寸 = 72 像素 = 72 磅 = 1440 缇
        //1 厘米 = 567缇
        ConvertUtil.getPixel = function (value, unit) {
            if (unit.toLowerCase() == "cm") {
                return Math.floor(value * 28.35);
            }
            else if (unit.toLowerCase() == "mm") {
                return Math.floor(value * 2.835);
            }
            throw new Error("Not support unit " + unit);
        };
        ConvertUtil.getUnit = function (pixel, unit) {
            if (unit.toLowerCase() == "cm") {
                return pixel / 28.35;
            }
            else if (unit.toLowerCase() == "mm") {
                return pixel / 2.835;
            }
            throw new Error("Not support unit " + unit);
        };
        ConvertUtil.toBoolean = function (value) {
            if (value == null)
                return false;
            var t = typeof value;
            if (t === "number" || t === "boolean")
                return Boolean(value);
            var str = String(value);
            if (!str)
                return false;
            str = str.toLowerCase();
            if (str == "true" || str == "是" || str == "对")
                return true;
            else if (str == "false" || str == "否" || str == "错")
                return false;
            var num = parseFloat(str);
            if (!isNaN(num))
                return num != 0;
            return Boolean(str);
        };
        /**
         * #开头进行转换，否则，转成uint
         * 支持格式：
         * #ffffff
         * 0xffffff
         * 整数
         */
        ConvertUtil.toColor = function (value) {
            if (!value)
                return 0;
            var index = value.indexOf("#");
            if (index >= 0)
                return parseInt(value.substr(index + 1), 16);
            return Number(value);
        };
        ConvertUtil.toHexColor = function (color) {
            var value = color.toString(16);
            return "#" + ConvertUtil.toPrefixed(value, 6);
        };
        ConvertUtil.toPrefixed = function (value, len) {
            var result = String(value);
            while (result.length < len) {
                result = "0" + result;
            }
            return result;
        };
        /**
         * 字符串转成日期，支持格式：
         * yyyy
         * yyyyMM
         * yyyyMMdd
         * yyyyMMddHH
         * yyyyMMddHHmm
         * yyyyMMddHHmmss
         * yyyy-MM
         * yyyy-MM-dd（“-”作判断关键字）
         * yyyy-MM-dd HH（“-”作判断关键字）
         * yyyy-MM-dd HH（“-”作判断关键字）
         * yyyy-MM-dd HH:mm （“-”作判断关键字）
         * yyyy-MM-dd HH:mm:ss（“-”作判断关键字）
         * yyyy年
         * yyyy年MM月
         * yyyy年MM月dd日（“年”作判断关键字）
         * yyyy年MM月dd日HH时（“年”作判断关键字）
         * yyyy年MM月dd日HH时mm分（“年”作判断关键字）
         * yyyy年MM月dd日HH时mm分ss秒（“年”作判断关键字）
         * MM/dd/yyyy（例如，“02/01/2005”）
         * MM/dd/yyyy HH:mm:ss
         * MM/yyyy dd（例如，“02/2005 23”）
         * Day Month Date Hours:Minutes:Seconds GMT Year（例如，“Tue Feb 1 00:00:00 GMT-0800 2005”，这与 toString() 一致）
         * Day Month Date Year Hours:Minutes:Seconds AM/PM（例如，“Tue Feb 1 2005 12:00:00 AM”，这与 toLocaleString() 一致）
         * Day Month Date Year Hours:Minutes:Seconds（例如，“Tue Feb 1 2005 23:59:59”）
         * Day Month Date Year（例如，“Tue Feb 1 2005”，这与 toDateString() 一致）
         */
        ConvertUtil.toDate = function (value) {
            if (!value)
                return new Date();
            if (ConvertUtil.isDate(value))
                return value;
            var _value = String(value);
            var year;
            var month;
            var date;
            var h = 0;
            var m = 0;
            var s = 0;
            var ms = 0;
            /*
             * yyyy
             * yyyyMM
             * yyyyMMdd
             * yyyyMMddHH
             * yyyyMMddHHmm
             * yyyyMMddHHmmss
             */
            if (!isNaN(Number(_value)) && _value.length >= 4) {
                year = Number(_value.substr(0, 4));
                month = 0;
                if (_value.length >= 6)
                    month = Number(_value.substr(4, 2)) - 1;
                date = 1;
                if (_value.length >= 8)
                    date = Number(_value.substr(6, 2));
                if (_value.length >= 10)
                    h = Number(_value.substr(8, 2));
                if (_value.length >= 12)
                    m = Number(_value.substr(10, 2));
                if (_value.length >= 14)
                    s = Number(_value.substr(12, 2));
                return new Date(year, month, date, h, m, s, ms);
            }
            /*
             * yyyy-MM
             * yyyy-MM-dd（“-”作判断关键字）
             * yyyy-MM-dd HH（“-”作判断关键字）
             * yyyy-MM-dd HH（“-”作判断关键字）
             * yyyy-MM-dd HH:mm （“-”作判断关键字）
             * yyyy-MM-dd HH:mm:ss（“-”作判断关键字）
             * yyyy年
             * yyyy年MM月
             * yyyy年MM月dd日（“年”作判断关键字）
             * yyyy年MM月dd日HH时（“年”作判断关键字）
             * yyyy年MM月dd日HH时mm分（“年”作判断关键字）
             * yyyy年MM月dd日HH时mm分ss秒（“年”作判断关键字）
             */
            if (_value.indexOf("-") > 0 || _value.indexOf("年") > 0 || _value.indexOf("/") > 0) {
                var match = _value.match(/\d+/g);
                year = Number(match[0]);
                month = 0;
                if (match.length > 1)
                    month = Number(match[1]) - 1;
                date = 1;
                if (match.length > 2)
                    date = Number(match[2]);
                if (match.length > 3)
                    h = Number(match[3]);
                if (match.length > 4)
                    m = Number(match[4]);
                if (match.length > 5)
                    s = Number(match[5]);
                return new Date(year, month, date, h, m, s, ms);
            }
            /*
             * MM/dd/yyyy（例如，“02/01/2005”）
             * MM/dd/yyyy HH:mm:ss
             * MM/yyyy dd（例如，“02/2005 23”）
             * Day Month Date Hours:Minutes:Seconds GMT Year（例如，“Tue Feb 1 00:00:00 GMT-0800 2005”，这与 toString() 一致）
             * Day Month Date Year Hours:Minutes:Seconds AM/PM（例如，“Tue Feb 1 2005 12:00:00 AM”，这与 toLocaleString() 一致）
             * Day Month Date Year Hours:Minutes:Seconds（例如，“Tue Feb 1 2005 23:59:59”）
             * Day Month Date Year（例如，“Tue Feb 1 2005”，这与 toDateString() 一致）
             */
            return new Date(_value);
        };
        ConvertUtil.formatNumber = function (value, format) {
            if (isNaN(value) || !format)
                return String(value);
            format = format.toLowerCase().trim();
            var index;
            var digits;
            index = format.indexOf("c#,#"); //货币符号、千分符
            if (index >= 0) {
                digits = Number(format.substr(index + 4));
                value = MathUtil.round(value, digits);
                return "￥" + ConvertUtil.thousandsSeparatorMoney(value);
            }
            index = format.indexOf("#,#"); //千分符数字
            if (index >= 0) {
                digits = Number(format.substr(index + 3));
                value = MathUtil.round(value, digits);
                return ConvertUtil.thousandsSeparatorMoney(value);
            }
            index = format.indexOf("c");
            if (index >= 0) {
                digits = Number(format.substr(index + 1));
                return "￥" + MathUtil.fixed(value, digits);
            }
            index = format.indexOf("f");
            if (index >= 0) {
                digits = Number(format.substr(index + 1));
                return MathUtil.fixed(value, digits);
            }
            index = format.indexOf("p");
            if (index >= 0) {
                digits = Number(format.substr(index + 1));
                return MathUtil.fixed(value * 100, digits) + "%";
            }
            index = format.indexOf("0.#");
            if (index >= 0) {
                digits = format.substr(index + 2).length;
                return String(Number(MathUtil.fixed(value, digits)));
            }
            return String(value);
        };
        /**
         * 千分位格式化金额：1,000.00
         */
        ConvertUtil.thousandsSeparatorMoney = function (value) {
            var result = "";
            var str = value.toString();
            var index = str.indexOf(".");
            if (index > 0) {
                result = str.substr(index);
                str = str.substr(0, index);
            }
            while (str.length > 3) {
                result = "," + str.substr(str.length - 3) + result;
                str = str.substr(0, str.length - 3);
            }
            result = str + result;
            return result;
        };
        ConvertUtil.formatDate = function (value, format) {
            var date = value;
            //format已经是小写
            if (format == "d")
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
            else if (format == "dt")
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
                    + " " + ConvertUtil.toPrefixed(date.getHours(), 2) + "时" + ConvertUtil.toPrefixed(date.getMinutes(), 2) + "分";
            else if (format == "yyyy-mm-dd")
                return date.getFullYear() + "-" + ConvertUtil.toPrefixed(date.getMonth() + 1, 2) + "-" + ConvertUtil.toPrefixed(date.getDate(), 2);
            else if (format == "yyyy-mm-dd hh:mm:ss")
                return date.getFullYear() + "-" + ConvertUtil.toPrefixed(date.getMonth() + 1, 2) + "-" + ConvertUtil.toPrefixed(date.getDate(), 2)
                    + " " + ConvertUtil.toPrefixed(date.getHours(), 2) + ":" + ConvertUtil.toPrefixed(date.getMinutes(), 2) + ":" + ConvertUtil.toPrefixed(date.getSeconds(), 2);
            else if (format == "yyyymmdd")
                return date.getFullYear() + ConvertUtil.toPrefixed(date.getMonth() + 1, 2) + ConvertUtil.toPrefixed(date.getDate(), 2);
            else if (format == "yyyymmddhhmmss")
                return date.getFullYear() + ConvertUtil.toPrefixed(date.getMonth() + 1, 2) + ConvertUtil.toPrefixed(date.getDate(), 2)
                    + ConvertUtil.toPrefixed(date.getHours(), 2) + ConvertUtil.toPrefixed(date.getMinutes(), 2) + ConvertUtil.toPrefixed(date.getSeconds(), 2);
            else if (format == "yyyymm")
                return date.getFullYear() + ConvertUtil.toPrefixed(date.getMonth() + 1, 2);
            else if (format == "yyyy")
                return date.getFullYear().toString();
            else if (format == "hh:mm:ss")
                return ConvertUtil.toPrefixed(date.getHours(), 2) + ":" + ConvertUtil.toPrefixed(date.getMinutes(), 2) + ":" + ConvertUtil.toPrefixed(date.getSeconds(), 2);
            return date.getFullYear() + "-" + ConvertUtil.toPrefixed(date.getMonth() + 1, 2) + "-" + ConvertUtil.toPrefixed(date.getDate(), 2);
        };
        ConvertUtil.formatBoolean = function (value, format) {
            var b = ConvertUtil.toBoolean(value);
            switch (format) {
                case "t/f":
                    return b ? "True" : "False";
                case "y/n":
                    return b ? "Yes" : "No";
                case "对/错":
                    return b ? "对" : "错";
                case "是/否":
                    return b ? "是" : "否";
                case "√/×":
                    return b ? "√" : "×";
                case "√/空白":
                    return b ? "√" : "";
            }
            return b.toString();
        };
        ConvertUtil.format = function (value, format) {
            if (!format)
                return String(value);
            format = format.toLowerCase().trim();
            //Boolean
            switch (format) {
                case "t/f":
                case "y/n":
                case "对/错":
                case "是/否":
                case "√/×":
                case "√/空白":
                    return ConvertUtil.formatBoolean(value, format);
            }
            if (ConvertUtil.isNumber(value)) {
                if (value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY)
                    return "NaN";
                if (!isNaN(Number(value)))
                    return ConvertUtil.formatNumber(value, format);
                else
                    return "NaN";
            }
            else if (ConvertUtil.isDate(value)) {
                return ConvertUtil.formatDate(value, format);
            }
            //Date
            switch (format) {
                case "d":
                case "dt":
                case "yyyy-mm-dd":
                case "yyyy-mm-dd hh:mm:ss":
                case "yyyymmdd":
                case "yyyymmddhhmmss":
                case "yyyymm":
                case "yyyy":
                case "hh:mm:ss":
                    if (!value)
                        return "";
                    var date = ConvertUtil.toDate(String(value));
                    return ConvertUtil.formatDate(date, format);
            }
            //Number
            if (format.indexOf("f") >= 0 || format.indexOf("c") >= 0 ||
                format.indexOf("p") >= 0 || format.indexOf("0.#") >= 0 || format.indexOf("#,#") >= 0) {
                if (!isNaN(Number(value)))
                    return ConvertUtil.formatNumber(Number(value), format);
            }
            return String(value);
        };
        ConvertUtil.toRMB = function (money) {
            var str1 = "零壹贰叁肆伍陆柒捌玖"; //0-9所对应的汉字
            var str2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; //数字位所对应的汉字
            var str3 = ""; //从原num值中取出的值
            var str4 = ""; //数字的字符串形式
            var str5 = ""; //人民币大写金额形式
            var i; //循环变量
            var j; //num的值乘以100的字符串长度
            var ch1 = ""; //数字的汉语读法
            var ch2 = ""; //数字位的汉字读法
            var nzero = 0; //用来计算连续的零值是几个
            var temp; //从原num值中取出的值
            money = Number(MathUtil.fixed(Math.abs(money), 2)); //将num取绝对值并四舍五入取2位小数
            str4 = Math.round(money * 100).toString(); //将num乘100并转换成字符串形式
            j = str4.length; //找出最高位
            if (j > 15) {
                return "溢出";
            }
            str2 = str2.substr(15 - j); //取出对应位数的str2的值。如：200.55,j为5所以str2=佰拾元角分
            //循环取出每一位需要转换的值
            for (i = 0; i < j; i++) {
                str3 = str4.substr(i, 1); //取出需转换的某一位的值
                temp = Number(str3); //转换为数字
                if (i != (j - 3) && i != (j - 7) && i != (j - 11) && i != (j - 15)) {
                    //当所取位数不为元、万、亿、万亿上的数字时
                    if (str3 == "0") {
                        ch1 = "";
                        ch2 = "";
                        nzero = nzero + 1;
                    }
                    else {
                        if (str3 != "0" && nzero != 0) {
                            ch1 = "零" + str1.substr(temp * 1, 1);
                            ch2 = str2.substr(i, 1);
                            nzero = 0;
                        }
                        else {
                            ch1 = str1.substr(temp * 1, 1);
                            ch2 = str2.substr(i, 1);
                            nzero = 0;
                        }
                    }
                }
                else {
                    //该位是万亿，亿，万，元位等关键位
                    if (str3 != "0" && nzero != 0) {
                        ch1 = "零" + str1.substr(temp * 1, 1);
                        ch2 = str2.substr(i, 1);
                        nzero = 0;
                    }
                    else {
                        if (str3 != "0" && nzero == 0) {
                            ch1 = str1.substr(temp * 1, 1);
                            ch2 = str2.substr(i, 1);
                            nzero = 0;
                        }
                        else {
                            if (str3 == "0" && nzero >= 3) {
                                ch1 = "";
                                ch2 = "";
                                nzero = nzero + 1;
                            }
                            else {
                                if (j >= 11) {
                                    ch1 = "";
                                    nzero = nzero + 1;
                                }
                                else {
                                    ch1 = "";
                                    ch2 = str2.substr(i, 1);
                                    nzero = nzero + 1;
                                }
                            }
                        }
                    }
                }
                if (i == (j - 11) || i == (j - 3)) {
                    //如果该位是亿位或元位，则必须写上
                    ch2 = str2.substr(i, 1);
                }
                str5 = str5 + ch1 + ch2;
                if (i == j - 1 && str3 == "0") {
                    //最后一位（分）为0时，加上“整”
                    str5 = str5 + '整';
                }
            }
            if (money == 0) {
                str5 = "零元整";
            }
            return str5;
        };
        ConvertUtil.toMD5 = function (v) {
            return MD5.toMD5(v);
        };
        return ConvertUtil;
    }());
    hlib.ConvertUtil = ConvertUtil;
    var DateUtil = (function () {
        function DateUtil() {
        }
        DateUtil.addDays = function (d, num) {
            var date;
            if (ConvertUtil.isDate(d)) {
                var date2 = d;
                date = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds());
            }
            else
                date = ConvertUtil.toDate(d);
            date.setDate(date.getDate() + num);
            return date;
        };
        DateUtil.addMonths = function (d, num) {
            var date;
            if (ConvertUtil.isDate(d)) {
                var date2 = d;
                date = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds());
            }
            else
                date = ConvertUtil.toDate(d);
            date.setMonth(date.getMonth() + num);
            return date;
        };
        DateUtil.addYears = function (d, num) {
            var date;
            if (ConvertUtil.isDate(d)) {
                var date2 = d;
                date = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds());
            }
            else
                date = ConvertUtil.toDate(d);
            date.setFullYear(date.getFullYear() + num);
            return date;
        };
        return DateUtil;
    }());
    hlib.DateUtil = DateUtil;
    var PathUtil = (function () {
        function PathUtil() {
        }
        /**This code produces output similar to the following:
         * HasExtension('myfile.ext') returns True
         * HasExtension('mydir\myfile') returns False
         * HasExtension('C:\mydir.ext\') returns False
         */
        PathUtil.hasExtension = function (path) {
            var index = path.lastIndexOf(".");
            if (index < 0)
                return false;
            var ext = path.substring(index);
            if (ext.lastIndexOf("\\") >= 0)
                return false;
            else
                return true;
        };
        /**This code produces output similar to the following:
         * GetExtension('C:\mydir.old\myfile.ext') returns '.ext'
         * GetExtension('C:\mydir.old\') returns ''
         */
        PathUtil.getExtension = function (path) {
            var index = path.lastIndexOf(".");
            if (index < 0)
                return "";
            var ext = path.substring(index);
            if (ext.lastIndexOf("\\") >= 0)
                return "";
            else
                return ext;
        };
        /**This code produces output similar to the following:
         * ChangeExtension(C:\mydir\myfile.com.extension, '.old') returns 'C:\mydir\myfile.com.old'
         * ChangeExtension(C:\mydir\myfile.com.extension, '') returns 'C:\mydir\myfile.com'
         * ChangeExtension(C:\mydir\, '.old') returns 'C:\mydir\.old'
         */
        PathUtil.changeExtension = function (path, extension) {
            var folder = PathUtil.getDirectoryName(path);
            if (folder)
                return PathUtil.combine(PathUtil.getDirectoryName(path), PathUtil.getFileNameWithoutExtension(path) + extension);
            return PathUtil.getFileNameWithoutExtension(path) + extension;
        };
        /**This code produces output similar to the following:
         * ChangeExtension(C:\mydir\myfile.com.extension, 'file') returns 'C:\mydir\file'
         * ChangeExtension(C:\mydir\file, '') returns 'C:\mydir\'
         * ChangeExtension(C:\mydir\, 'file') returns 'C:\mydir\file'
         */
        PathUtil.changeFileName = function (path, fileName) {
            return PathUtil.combine(PathUtil.getDirectoryName(path), fileName);
        };
        /**This code produces output similar to the following:
         * GetDirectoryName('C:\mydir\myfile.ext') returns 'C:\mydir'
         * GetDirectoryName('C:\mydir\') returns 'C:\mydir'
         * GetDirectoryName('C:\') returns ''
         * GetDirectoryName('C:') returns ''
         */
        PathUtil.getDirectoryName = function (path) {
            var str = "";
            var index = path.lastIndexOf("\\");
            if (index < 0) {
                str = "";
            }
            str = path.substring(0, index);
            return str;
        };
        /**This code produces output similar to the following:
         * GetFileName('C:\mydir\myfile.ext') returns 'myfile.ext'
         * GetFileName('C:\mydir\') returns ''
         * GetFileName('C:') returns ''
         */
        PathUtil.getFileName = function (path) {
            var fileName = "";
            var index = path.lastIndexOf("\\");
            fileName = path.substring(index + 1);
            return fileName;
        };
        /**This code produces output similar to the following:
         * GetFileNameWithoutExtension('C:\mydir\myfile.ext') returns 'myfile'
         * GetFileName('C:\mydir\') returns ''
         */
        PathUtil.getFileNameWithoutExtension = function (path) {
            var fileName = PathUtil.getFileName(path);
            var index = fileName.lastIndexOf(".");
            if (index >= 0)
                fileName = fileName.substring(0, index);
            return fileName;
        };
        /**This code produces output similar to the following:
         * GetPathRoot('\mydir\') returns '\'
         * GetPathRoot('myfile.ext') returns ''
         * GetPathRoot('C:\mydir\myfile.ext') returns 'C:\'
         */
        PathUtil.getPathRoot = function (path) {
            var index = path.indexOf("\\");
            var str = path.substring(0, index + 1);
            return str;
        };
        /**This code produces output similar to the following:
         * "c:\test" "123" ->"c:\test\123"
         * "c:\test" "\123" ->"c:\test\123"
         * "c:\test\" "\123" ->"c:\test\123"
         * "c:\test\" "123" ->"c:\test\123"
         */
        PathUtil.combine = function (path1, path2) {
            if (path1.charAt(path1.length - 1) == "\\" && path2.charAt(0) == "\\")
                return path1 + path2.substring(1);
            else if (path1.charAt(path1.length - 1) == "\\" && path2.charAt(0) != "\\" || path1.charAt(path1.length - 1) != "\\" && path2.charAt(0) == "\\")
                return path1 + path2;
            else if (path1.charAt(path1.length - 1) != "\\" && path2.charAt(0) != "\\")
                return path1 + "\\" + path2;
            return null;
        };
        /**This code produces output similar to the following:
         * ToOpposite('Project\Demo1\Asset') returns 'Project/Demo1/Asset'
         * ToOpposite('c:\Project\Demo1\Asset\text.xml', 'c:\Project\') returns 'Demo1/Asset'
         */
        PathUtil.toOpposite = function (path, root) {
            if (root === void 0) { root = null; }
            if (root == null || root.length == 0 || root.length > path.length)
                return path.replace(/\\/g, "/");
            var result = path.substring(root.length).replace(/\\/g, "/");
            if (result.length > 0 && result.charAt(0) == "/")
                result = result.substring(1);
            return result;
        };
        /**This code produces output similar to the following:
         * ToLocal('Project/Demo1/Asset') returns 'Project\Demo1\Asset'
         */
        PathUtil.toLocal = function (path, root) {
            if (root === void 0) { root = null; }
            var reg = new RegExp("/", "g");
            if (root == null)
                return path.replace(reg, "\\");
            if (path == null || path.length == 0)
                return "";
            return PathUtil.combine(root, path.replace(reg, "\\"));
        };
        /**比较路径是否相等
         */
        PathUtil.compare = function (path1, path2, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (path1 == path2)
                return true;
            if (ignoreCase)
                return PathUtil.combine(path1, "d").toLowerCase() == PathUtil.combine(path2, "d").toLowerCase();
            else
                return PathUtil.combine(path1, "d") == PathUtil.combine(path2, "d");
        };
        /**
         * 合并Url地址
         * "/test" "123" ->"/test/123"
         * "/test" "/123" ->"/test/123"
         * "/test/" "/123" ->"/test/123"
         * "/test/" "123" ->"/test/123"
         */
        PathUtil.combineURL = function (path1, path2) {
            if (path1.charAt(path1.length - 1) == "/" && path2.charAt(0) == "/")
                return path1 + path2.substring(1);
            else if (path1.charAt(path1.length - 1) == "/" && path2.charAt(0) != "/" || path1.charAt(path1.length - 1) != "/" && path2.charAt(0) == "/")
                return path1 + path2;
            else if (path1.charAt(path1.length - 1) != "/" && path2.charAt(0) != "/")
                return path1 + "/" + path2;
            return null;
        };
        /**
         * 获取网络路径服务器
         */
        PathUtil.getUrlHost = function (url) {
            if (!url)
                return "";
            var start = url.indexOf("://");
            if (start > 0) {
                start += 3;
                var end = url.indexOf("/", start);
                if (end > start)
                    return url.substring(0, end);
            }
            return url;
        };
        /**
         * 获取网络路径服务器
         */
        PathUtil.getParentURL = function (path) {
            var str = "";
            var index = path.lastIndexOf("/");
            if (index < 0)
                index = path.lastIndexOf("\\");
            if (index < 0) {
                str = "";
            }
            str = path.substring(0, index);
            return str;
        };
        return PathUtil;
    }());
    hlib.PathUtil = PathUtil;
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         *  Generates a UID "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
         * @returns {string}
         */
        StringUtil.createUID = function () {
            var uid = [];
            var index = 0;
            var i;
            var j;
            for (i = 0; i < 8; i++) {
                uid[index++] = StringUtil.ALPHA_CHAR_CODES[Math.floor(Math.random() * 16)];
            }
            for (i = 0; i < 3; i++) {
                uid[index++] = 45; // charCode for "-"
                for (j = 0; j < 4; j++) {
                    uid[index++] = StringUtil.ALPHA_CHAR_CODES[Math.floor(Math.random() * 16)];
                }
            }
            uid[index++] = 45; // charCode for "-"
            var time = new Date().getTime();
            var timeString = ("0000000" + time.toString(16).toUpperCase()).substr(-8);
            for (var i = 0; i < 8; i++) {
                uid[index++] = timeString.charCodeAt(i);
            }
            for (i = 0; i < 4; i++) {
                uid[index++] = StringUtil.ALPHA_CHAR_CODES[Math.floor(Math.random() * 16)];
            }
            return String.fromCharCode.apply(null, uid);
        };
        StringUtil.contains = function (src, tokens) {
            if (!src)
                return false;
            for (var i = 0; i < src.length; i++) {
                var c = src.charAt(i);
                if (tokens.indexOf(c) >= 0)
                    return true;
            }
            return false;
        };
        /**
         * 是否包含XML关键字符< ' " & >
         * @param value
         * @returns {boolean}
         */
        StringUtil.hasXmlChar = function (value) {
            if (!value)
                return false;
            for (var i = 0; i < value.length; i++) {
                var c = value.charAt(i);
                switch (c) {
                    case "<":
                    case ">":
                    case "&":
                    case "\"":
                    case "\'":
                        return true;
                }
            }
            return false;
        };
        /**
         * 替换< ' " & >字符
         * @param value
         * @param check
         * @returns {string}
         */
        StringUtil.escapeXML = function (value, check) {
            if (check === void 0) { check = true; }
            if (check && !StringUtil.hasXmlChar(value)) {
                return value;
            }
            return value.replace(/&/g, "&amp;").replace(/</g, "&lt;")
                .replace(/>/g, "&gt;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        };
        /**
         * 替换<  " & >字符
         * @param value
         * @param check
         * @returns {string}
         */
        StringUtil.escapeXMLIgnoreApos = function (value, check) {
            if (check === void 0) { check = true; }
            if (check && !StringUtil.hasXmlChar(value)) {
                return value;
            }
            return value.replace(/&/g, "&amp;").replace(/</g, "&lt;")
                .replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
        };
        StringUtil.unescapeXML = function (value) {
            return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">").replace(/&apos;/g, "\'").replace(/&quot;/g, "\"");
        };
        StringUtil.format = function (str) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (!str)
                return "";
            var len = rest.length;
            var args;
            if (len == 1 && hlib.ConvertUtil.isArray(rest[0])) {
                args = rest[0];
                len = args.length;
            }
            else {
                args = rest;
            }
            for (var i = 0; i < len; i++) {
                str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
            }
            return str;
        };
        StringUtil.replace = function (value, oldStr, newStr) {
            var startIndex = 0;
            var result = value;
            var begin = result.indexOf(oldStr, startIndex);
            while (begin >= 0) {
                result = result.substring(0, begin) + newStr + result.substr(begin + oldStr.length);
                startIndex = begin + newStr.length;
                begin = result.indexOf(oldStr, startIndex);
            }
            return result;
        };
        /**
         * 忽略大小写比较字符串
         */
        StringUtil.ignoreCaseCompare = function (str1, str2) {
            if (str1 == str2)
                return true;
            if (str1 == null || str2 == null)
                return false;
            return str1.toLowerCase() == str2.toLowerCase();
        };
        /**
         * 判断是否空格
         */
        StringUtil.isWhitespace = function (character) {
            switch (character) {
                case " ":
                case "\t":
                case "\r":
                case "\n":
                case "\f":
                    return true;
                default:
                    return false;
            }
        };
        /**
         * 去除字符串前空格
         */
        StringUtil.trimStart = function (str) {
            if (str == null)
                return '';
            var startIndex = 0;
            while (StringUtil.isWhitespace(str.charAt(startIndex)))
                ++startIndex;
            var endIndex = str.length - 1;
            if (endIndex >= startIndex)
                return str.slice(startIndex, endIndex + 1);
            else
                return "";
        };
        /**
         * 去除字符串后空格
         */
        StringUtil.trimEnd = function (str) {
            if (str == null)
                return '';
            var startIndex = 0;
            var endIndex = str.length - 1;
            while (StringUtil.isWhitespace(str.charAt(endIndex)))
                --endIndex;
            if (endIndex >= startIndex)
                return str.slice(startIndex, endIndex + 1);
            else
                return "";
        };
        StringUtil.startsWidth = function (src, value, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (src && value && src.length >= value.length) {
                if (ignoreCase) {
                    return StringUtil.ignoreCaseCompare(src.substr(0, value.length), value);
                }
                else {
                    return src.indexOf(value) == 0;
                }
            }
            else if (src && value == "") {
                return true;
            }
            return false;
        };
        StringUtil.startsRepeat = function (src, value, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (!src || !value)
                return 0;
            var count = 0;
            var i = 0;
            while (i < src.length) {
                var str = src.substr(i, value.length);
                if (ignoreCase) {
                    if (!StringUtil.ignoreCaseCompare(str, value))
                        break;
                }
                else {
                    if (str != value)
                        break;
                }
                count++;
                i += value.length;
            }
            return count;
        };
        StringUtil.endsWidth = function (src, value, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (src && value && src.length >= value.length) {
                if (ignoreCase) {
                    return StringUtil.ignoreCaseCompare(src.substr(src.length - value.length), value);
                }
                else {
                    return src.lastIndexOf(value) == src.length - value.length;
                }
            }
            return false;
        };
        StringUtil.startsAndEndsWidth = function (src, start, end, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            return StringUtil.startsWidth(src, start, ignoreCase) && StringUtil.endsWidth(src, end, ignoreCase);
        };
        /**
         * 去掉src头尾
         */
        StringUtil.sliceWidth = function (src, start, end, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (!src)
                return "";
            var _start = 0;
            var _end = Number.MAX_VALUE;
            if (start && StringUtil.startsWidth(src, start, ignoreCase))
                _start = start.length;
            if (end && StringUtil.endsWidth(src, end, ignoreCase))
                _end = src.length - end.length;
            return src.slice(_start, _end);
        };
        StringUtil.indexOf = function (src, value, start, ignoreCase) {
            if (start === void 0) { start = 0; }
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (!ignoreCase)
                return src.indexOf(value, start);
            if (src.length == 0)
                return -1;
            for (var i = start; i < src.length; i++) {
                if (StringUtil.ignoreCaseCompare(src.substr(i, value.length), value)) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * 以delim分割，并对每项调用Trim
         */
        StringUtil.splitTrim = function (src, delim) {
            var tokens = src.split(delim);
            for (var i = 0; i < tokens.length; i++) {
                tokens[i] = tokens[i].trim();
            }
            return tokens;
        };
        StringUtil.repeat = function (value, count) {
            var res = "";
            for (var i = 0; i < count; i++) {
                res += value;
            }
            return res;
        };
        StringUtil.splitAtLen = function (value, len) {
            var tokens = [];
            if (!value || !len) {
                tokens.push(value);
                return tokens;
            }
            var index = 0;
            var start = 0;
            var token;
            while (index < value.length) {
                index++;
                if (index % len == 0) {
                    token = value.substring(start, index);
                    tokens.push(token);
                    start = index;
                }
                else if (index == value.length) {
                    token = value.substring(start);
                    tokens.push(token);
                }
            }
            return tokens;
        };
        StringUtil.ALPHA_CHAR_CODES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];
        return StringUtil;
    }());
    hlib.StringUtil = StringUtil;
})(hlib || (hlib = {}));
//# sourceMappingURL=hlib.js.map