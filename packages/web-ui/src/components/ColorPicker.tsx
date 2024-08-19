import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import { getTextColor } from '../utils'
import { Button } from './Button'
import { Input } from './Input'
import { Label } from './Label'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

export type ColorPickerProps = {
    color?: string
    onColorChange?: (color: string) => void
}

export const ColorPicker = ({ color: _color, onColorChange }: ColorPickerProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>(_color ?? '#000000')

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    style={{
                        backgroundColor: color,
                        color: getTextColor(color),
                    }}
                >
                    {color}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center space-y-3">
                <Label className="text-lg font-bold">Pick a color</Label>
                <HexColorPicker
                    color={color}
                    onChange={(newColor) => {
                        onColorChange?.(newColor)
                        setColor(newColor)
                    }}
                />
                <div className="flex w-[80px] items-center rounded-md border border-input px-2">
                    <div>#</div>
                    <Input
                        className="border-none pl-1 pr-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={color.slice(1)}
                        minLength={6}
                        maxLength={6}
                        onChange={(e) => {
                            const newColor = e.target.value
                            onColorChange?.(newColor)
                            setColor('#' + newColor)
                        }}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
