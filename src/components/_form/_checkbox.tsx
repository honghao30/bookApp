import React from 'react';
import { ChangeEvent, FC  } from 'react'
import { uniqueId } from '../../utils/common';

interface InputProps {
    label: string
    value: string | 'number'
    name: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const MyCheck: FC<InputProps> = ({    
    label,    
    value,
    onChange  // 상위 컴포넌트에서 전달받은 onChange 핸들러
}) => {
    const id = uniqueId()

    return (
        <>
            <div className="form-checkbox__wrap">                
                <div className="form-checkbox">
                    <input
                        type="checkbox" 
                        value={ value }
                        id={ id }
                        onChange={onChange}  // onChange 핸들러 사용
                        />
                    <label htmlFor={ id }>{ label }</label>
                </div>
            </div>
        </>
    )
}

export default MyCheck
