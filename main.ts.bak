/**
* makecode I2C LCM1602-14 package for microbit.
* From lingsky.
* http://www.lingsky.net
*/

/**
 * I2C LCD1602 液晶软件包
 */
//% weight=100 color=#0fbc11 icon="0"
namespace I2C_LCD1602 {
    let i2cAddr: number // 62（0x3E）:LCM1602-14
    let BK: number      // backlight control
    let RS: number      // command/data

    // set LCD reg
    function setreg(d: number) {
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
        basic.pause(1)
    }
    // set LCD reg
    function setreg2(d: number) {
        pins.i2cWriteNumber(i2cAddr, 0x80, 2, true)
        pins.i2cWriteNumber(i2cAddr, d, 2)
        //basic.pause(1)
    }
    // send data to I2C bus
    function set(d: number) {
        d = d & 0xF0
        d = d + BK + RS
        setreg(d)
        setreg(d + 4)
        setreg(d)
    }

    // send command
    function cmd(d: number) {
        RS = 0
        set(d)
        set(d << 4)
    }

    // send data
    function dat(d: number) {
        RS = 1
        set(d)
        set(d << 4)
    }

    /**
     * 初始化 LCD, 设置 I2C 地址。I2C LCM1602-14默认 62（0x3E）。
     * @param address is i2c address for LCD, eg: 62（0x3E）
     */
    //% blockId="I2C_LCD1620_SET_ADDRESS" block="初始化液晶，I2C 地址 %addr"
    //% weight=100 blockGap=8
    export function LcdInit(address: number) {
        i2cAddr = address
        BK = 8
        RS = 0
	
	basic.pause(50)
        setreg2(0x28)       // set 4bit mode
        basic.pause(5)
        setreg2(0x28)
        basic.pause(1)
        setreg2(0x28)
        setreg2(0x28)       // set mode
        setreg2(0x0C)
	//basic.pause(1)
        
	setreg2(0x06)

	setreg2(0x01)       // clear
	basic.pause(2)

    }

    /**
     * 在液晶的指定位置显示数字
     * @param n is number will be show, eg: 10, 100, 200
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="I2C_LCD1620_SHOW_NUMBER" block="显示数字 %n|位置 x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowNumber(n: number, x: number, y: number): void {
        let s = n.toString()
        ShowString(s, x, y)
    }

    /**
     * 在液晶的指定位置显示字符串
     * @param s is string will be show, eg: "Hello"
     * @param x is LCD column position, [0 - 15], eg: 0
     * @param y is LCD row position, [0 - 1], eg: 0
     */
    //% blockId="I2C_LCD1620_SHOW_STRING" block="显示字符串 %s|位置 x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowString(s: string, x: number, y: number): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    /**
     * 打开液晶显示
     */
    //% blockId="I2C_LCD1620_ON" block="打开液晶"
    //% weight=80 blockGap=8
    export function on(): void {
        cmd(0x0C)
    }

    /**
     * 关闭液晶显示
     */
    //% blockId="I2C_LCD1620_OFF" block="关闭液晶"
    //% weight=80 blockGap=8
    export function off(): void {
        cmd(0x08)
    }

    /**
     * 清除液晶上显示的内容
     */
    //% blockId="I2C_LCD1620_CLEAR" block="清除液晶显示内容"
    //% weight=75 blockGap=8
    export function clear(): void {
        cmd(0x01)
    }

    /**
     * 打开液晶的背光
     */
    //% blockId="I2C_LCD1620_BACKLIGHT_ON" block="打开液晶背光"
    //% weight=70 blockGap=8
    export function BacklightOn(): void {
        BK = 8
        dat(0)
    }

    /**
     * 关闭液晶的背光
     */
    //% blockId="I2C_LCD1620_BACKLIGHT_OFF" block="关闭液晶背光"
    //% weight=70 blockGap=8
    export function BacklightOff(): void {
        BK = 0
        dat(0)
    }

}
