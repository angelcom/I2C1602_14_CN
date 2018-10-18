/**
* makecode I2C LCM1602-14 package for microbit.
* From ling.
* http://www.lingsky.net
*/

/**
 * I2C LCM1602-14 液晶软件包
 */
//% weight=100 color=#0020ff icon=""
namespace I2C_LCD1602_14 {
    let i2cAddr: number // 0x3E
    //let BK: number      // backlight control Not Use

    export enum CustomChar {
        //% block="Heart"
        Heart = 0,
        HeartSmall = 1,
        //% block="Smile"
        Smile = 2,
        Sad = 3,
        Degree = 4,
        ArmsUp = 5,
        ArmsDown = 6,
    }

    let Heart = [
        0b00000,
        0b01010,
        0b11111,
        0b11111,
        0b11111,
        0b01110,
        0b00100,
        0b00000
    ];

    let HeartSmall = [
        0b00000,
        0,
        0b01010,
        0b01110,
        0b01110,
        0b00100,
        0,
        0
    ];

    let Smile = [
        0b00000,
        0b00000,
        0b01010,
        0b00000,
        0b00000,
        0b10001,
        0b01110,
        0b00000
    ];

    let Sad = [
        0b00000,
        0b00000,
        0b01010,
        0b00000,
        0b00000,
        0b00000,
        0b01110,
        0b10001
    ];
    let ArmsDown = [
        0b00100,
        0b01010,
        0b00100,
        0b00100,
        0b01110,
        0b10101,
        0b00100,
        0b01010
    ];

    let ArmsUp = [
        0b00100,
        0b01010,
        0b00100,
        0b10101,
        0b01110,
        0b00100,
        0b00100,
        0b01010
    ];

    let Degree = [
        0,
        0b10110,
        0b01001,
        0b01000,
        0b01000,
        0b01001,
        0b00110,
        0,
    ]

    let Empty = [
        0b11011,
        0b10111,
        0b10111,
        0b11011,
        0b11101,
        0b11110,
        0b11101,
        0b11011,
    ]
    /**
         * 测试造字程序
          */
    //% blockId="test" block="Test "
    //% weight=100 blockGap=8
    export function test() {
        CreateCustomChar(0, Heart);

        ShowString("test", 0, 0)

        dat(0)
    }

    //% blockId="I2C_LCD1602_CustomChar_Conv" block="自定义字符 %c"
    export function CustomCharConv(c: CustomChar): number[] {
        switch (c) {
            case CustomChar.ArmsDown: return ArmsDown;
            case CustomChar.ArmsUp: return ArmsUp;
            case CustomChar.Degree: return Degree;
            case CustomChar.Heart: return Heart;
            case CustomChar.Sad: return Sad;
            case CustomChar.Smile: return Smile;
            case CustomChar.HeartSmall: return HeartSmall;
        }
        return Empty;
    }


    /**
     * 初始化 LCD, 设置 I2C 地址。根据芯片不同地址有两种，LCM1602-14 是62(0x3E)。
     * @param address is i2c address for LCD, eg: 62 (0x3E)
     */
    //% blockId="LcdInitx" block="初始化液晶，I2C 地址 %address"
    //% weight=100 blockGap=8
    export function LcdInit(address: number) {
        i2cAddr = address
        basic.pause(50)
        cmd(0x28)       // set 4bit mode
        basic.pause(5)
        cmd(0x28)       // set 4bit mode
        basic.pause(1)
        cmd(0x0C)
        cmd(0x06)
        cmd(0x01)       // clear wait more then 2ms
        basic.pause(5)
    }

    /**
     * 在液晶的指定位置显示数字
     * @param n is number will be show, eg: 10, 100, 200
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="I2C_LCD1602_SHOW_NUMBER" block="显示 数字 %n|位置 x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowNumber(n: number, x: number, y: number): void {
        let s = n.toString()
        ShowString(s, x, y)
    }

    /**
     * 在液晶的指定位置显示字符串
     * @param s is string will be show, eg: "Hello micro:bit!"
     * @param x is LCD column position, [0 - 15], eg: 0
     * @param y is LCD row position, [0 - 1], eg: 0
     */
    //% blockId="I2C_LCD1602_SHOW_STRING" block="显示 字符串 %s|位置 x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowString(s: string, x: number, y: number): void {
        setCursor(x, y);

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    /**
     * 打开液晶显示
     */
    //% blockId="I2C_LCD1602_ON" block="打开液晶"
    //% weight=80 blockGap=8
    export function on(): void {
        cmd(0x0C)
    }

    /**
     * 关闭液晶显示
     */
    //% blockId="I2C_LCD1602_OFF" block="关闭液晶"
    //% weight=80 blockGap=8
    export function off(): void {
        cmd(0x08)
    }

    /**
     * 清除液晶上显示的内容
     */
    //% blockId="I2C_LCD1602_CLEAR" block="清除液晶显示内容"
    //% weight=75 blockGap=8
    export function clear(): void {
        cmd(0x01)
        basic.pause(5)
    }


    /**
     * 造字 1602一共可以造8个5*8的自定义字符
     * @param code is font code, eg: 0
     * @param fontList is 8 byte list
     */
    //% blockId="I2C_LCD1602_Create_CustomChar" block="自定义字符 %code |编码 %fontList=CustomCharConv"
    //% code.min=0 code.max=7
    //% weight=100 blockGap=8
    export function CreateCustomChar(code: number, fontList: number[]) {
        cmd(0x40 | (code & 0x7) << 3);
        let buf = pins.createBuffer(9);
        buf[0] = 0x40
        for (let i = 0; i < 8; i++) {
            buf[i + 1] = fontList[i];
        }
        pins.i2cWriteBuffer(i2cAddr, buf);
        basic.pause(5)
    }

    /**
     * 在液晶的指定位置显示自定义字符
     * @param s is string will be show, [0 - 7], eg: 0
     * @param x is LCD column position, [0 - 15], eg: 0
     * @param y is LCD row position, [0 - 1], eg: 0
     */
    //% blockId="I2C_LCD1602_SHOW_STRING_MY" block="显示 自定义字符 %s|位置 x %x|y %y"
    //% weight=90 blockGap=8
    //% s.min=0 s.max=7
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowString_MY(s: number, x: number, y: number): void {
        setCursor(x, y);
        dat(s)
    }
    // 设置光标位置
    function setCursor(col: number, row: number) {
        col = (row == 0 ? col | 0x80 : col | 0xc0);
        cmd(col)
    }
    // send command
    function cmd(d: number) {
        pins.i2cWriteNumber(i2cAddr, 0x8000 | d, 9)
        basic.pause(1)
    }
    // send data
    function dat(d: number) {
        pins.i2cWriteNumber(i2cAddr, 0x4000 | d, 9)
        basic.pause(1)
    }
    // 从robotbit找来的代码，看上去更科学一些。。。。
    // function i2cwrite(addr: number, reg: number, value: number) {
    //     let buf = pins.createBuffer(2)
    //     buf[0] = reg
    //     buf[1] = value
    //     pins.i2cWriteBuffer(addr, buf)
    // }

    // function i2ccmd(addr: number, value: number) {
    //     let buf = pins.createBuffer(1)
    //     buf[0] = value
    //     pins.i2cWriteBuffer(addr, buf)
    // }

    // function i2cread(addr: number, reg: number) {
    //     pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
    //     let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
    //     return val;
    // }

}
