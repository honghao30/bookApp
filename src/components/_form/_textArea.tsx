import { ChangeEvent, FC, useState } from 'react';
import { uniqueId } from '../../utils/common';
import MyBtn from '../ui_elements/MyBtn';
import { TextAreaProps  } from '../../type/index';


interface OwnProps {
  TextAreaProps: TextAreaProps;
  onButtonClick?: () => void;
}


const MyInput: FC<OwnProps> = ({ TextAreaProps, onButtonClick }) => {
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    TextAreaProps.onChange && TextAreaProps.onChange(event)
  };

  const id = uniqueId();

  return (
    <>
      <div className={`form-input__wrap ${TextAreaProps.label ? 'user-title' : ''}`}>
        <label htmlFor={id}>{TextAreaProps.label}</label>
        <div className={`form-input ${TextAreaProps.innerBtnProps?.innerButton ? 'hs-btn' : ''}`}>
          <span className='text-area'>
            <textarea 
                id="id"
                name={TextAreaProps.name}
                value={ TextAreaProps.value }
                title={TextAreaProps.title}
                placeholder={TextAreaProps.placeholder}
                maxLength={TextAreaProps.maxLength}              
                onChange={handleChange}
                // onBlur={ handleBlur }
                disabled={TextAreaProps.disabled}              
            >
            </textarea>
          </span>
        </div>
      </div>
      {TextAreaProps.message?.guide && <div className='guide-msg'>{TextAreaProps.message.guideMsg}</div>}
      {TextAreaProps.message?.error && <div className='error-msg'>{TextAreaProps.message.errorMsg}</div>}
    </>
  );
};

export default MyInput;
