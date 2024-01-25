import { ChangeEvent, FC, useState } from 'react';
import { uniqueId } from '../../utils/common';
import MyBtn from '../../components/ui_elements/MyBtn';
import { InputProps  } from '../../type/index';


interface OwnProps {
  inputProps: InputProps;
  onButtonClick?: () => void;
}


const MyInput: FC<OwnProps> = ({ inputProps, onButtonClick }) => {
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    inputProps.onChange && inputProps.onChange(event)
  };

  const id = uniqueId();

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur && inputProps.onBlur(event)
  }

  return (
    <>
      <div className={`form-input__wrap ${inputProps.label ? 'user-title' : ''}`}>
        <label htmlFor={id}>{inputProps.label}</label>
        <div className={`form-input ${inputProps.innerBtnProps?.innerButton ? 'hs-btn' : ''}`}>
          <span className='input'>
            <input 
              type={inputProps.type}
              id={id}
              name={inputProps.name}
              value={ inputProps.value }
              title={inputProps.title}
              placeholder={inputProps.placeholder}
              maxLength={inputProps.maxLength}              
              onChange={handleChange}
              onBlur={ handleBlur }
              disabled={inputProps.disabled}
            />
          </span>
          {inputProps.innerBtnProps?.innerButton && 
            <MyBtn
              type='button' 
              iconOnly={false} 
              btnColor={inputProps.innerBtnProps.buttonOption.btnColor} 
              btnSize={inputProps.innerBtnProps.buttonOption.btnSize || ''}
              activeClass={inputProps.innerBtnProps.buttonOption.activeClass || ''}
              onClick={ onButtonClick }
            >
              { inputProps.innerBtnProps.buttonOption.iconOnly && <i className={ inputProps.innerBtnProps.buttonOption.activeClass ? inputProps.innerBtnProps.buttonOption.activeClass : inputProps.innerBtnProps.buttonOption.iconName }></i> }
              { inputProps.innerBtnProps.buttonOption.iconOnly ? <span className='ir-text'>inputProps.innerBtnProps.buttonName </span> : inputProps.innerBtnProps.buttonName }
            </MyBtn>
          }
        </div>
      </div>
      {inputProps.message?.guide && <div className='guide-msg'>{inputProps.message.guideMsg}</div>}
      {inputProps.message?.error && <div className='error-msg'>{inputProps.message.errorMsg}</div>}
    </>
  );
};

export default MyInput;
