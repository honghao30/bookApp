import { ChangeEvent, FC  } from 'react'
import { uniqueId } from '../../utils/common'
import MyBtn from '../../components/ui_elements/MyBtn'

interface InputProps {    
    label: string        
    title: string        
    guide?: boolean
    guideMsg?: string    
    error?: boolean
    errorMsg?: string
    innerButton?: boolean
    buttonName?: string
    buttonInColor?: string
    buttonInSize?: string
    disabled?: boolean    
}

const MySelct: FC<InputProps> = ({
    label,
    title,    
    guide,
    guideMsg,
    error,
    errorMsg,
    disabled,
    innerButton,
    buttonName,  
    buttonInColor,  
    buttonInSize
}) => {
    
    const id = uniqueId()

    return (
        <>
            <div className={`form-select__wrap ${label ? 'user-title' : ''}`}>
                <label htmlFor={ id }>{ label }</label>
                <div className={`form-select ${innerButton ? 'hs-btn' : ''}`}>
                    <span className='select'>    
                        <select
                            title={ title }                            
                            disabled={ disabled }
                            id={ id }
                        >
                            <option>이미지</option>
                            <option>유튜브 링크</option>
                        </select>
                    </span>
                    {/* 경우에 따라 버튼 노출 */}
                    { innerButton && 
                        <MyBtn
                            type='button' 
                            iconOnly={false} 
                            btnColor={ buttonInColor } 
                            btnSize={ buttonInSize } activeClass={''}
                            >
                                { buttonName }
                        </MyBtn>         
                    }           
                </div>
            </div>
            { guide && <div className='guide-msg'>
                { guideMsg }
            </div> }            
            { error && <div className='error-msg'>
                { errorMsg }
            </div> }        
        </>
    )
}
export default MySelct