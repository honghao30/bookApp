import { ChangeEvent } from "react"

// type 기본
export interface InputProps {
    type: 'text' | 'password' | 'email' | 'number' | 'file',
    label: string    
    name: string
    title?: string
    value: string
    placeholder: string
    maxLength?: number
    disabled?: boolean
    message?: MessageProps
    innerBtnProps?: innerBtnProps
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

// type 정의
export interface MessageProps {
    guide?: boolean
    guideMsg?: string[]
    error?: boolean
    errorMsg?: string
}
// 내부 버튼
export interface innerBtnProps {
    innerButton?: boolean
    buttonName?: string
    buttonOption: buttonType
}

// 버튼 타입
export interface buttonType {
    type: 'button' | 'submit'  
    iconOnly?: boolean
    disabled?: boolean
    btnColor?: string
    btnSize?: string
    iconName?: string
    activeClass?: string
    children?: React.ReactNode
    onClick?: () => void 
}
//teat area



export type TextAreaProps = Omit<InputProps, 'type'>;