import { FC  } from 'react'

interface buttonProps {
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



const MyBtn: FC<buttonProps> = ({ 
  type,   
  iconOnly, 
  disabled, 
  btnColor, 
  btnSize,
  iconName,
  activeClass,
  children,
  onClick
  }) => {
   
  const className = `btn ${btnColor} ${btnSize}`;
  const iconBtn = 'btn btn-icon-only';
  const active = `${iconName} ${activeClass}`;

  return (  
    <button 
        type={ type }
        className={iconOnly ? iconBtn : className}
        disabled={disabled} 
        onClick={onClick}       
    >
      { iconOnly && <i className={ active ? active : iconName }></i> }
      {children}
    </button>

  )
}
export default MyBtn;