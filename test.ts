
let count = 0
input.onButtonPressed(Button.B, () => {
    for (let i = 0; i < 6; i++) {
        if (count % 2 == 1) {
            I2C_LCD1602_14.ShowString_MY(0, 2, 0)
            basic.pause(1200)
        } else {
            I2C_LCD1602_14.ShowString_MY(1, 2, 0)
            basic.pause(300)
        }
        count += 1
    }
})
input.onButtonPressed(Button.A, () => {
    I2C_LCD1602_14.CreateCustomChar(3, [0, 10, 21, 17, 17, 10, 4, 0])
    I2C_LCD1602_14.ShowString_MY(3, 2, 0)
})
I2C_LCD1602_14.LcdInit(62)
I2C_LCD1602_14.ShowString("I   micro:bit!", 0, 0)
I2C_LCD1602_14.CreateCustomChar(0, I2C_LCD1602_14.CustomCharConv(I2C_LCD1602_14.CustomChar.Heart))
I2C_LCD1602_14.CreateCustomChar(1, I2C_LCD1602_14.CustomCharConv(I2C_LCD1602_14.CustomChar.HeartSmall))
I2C_LCD1602_14.ShowString_MY(0, 2, 0)
count = 0
I2C_LCD1602_14.ShowString("No:", 0, 1)
I2C_LCD1602_14.ShowNumber(control.deviceSerialNumber(), 3, 1)