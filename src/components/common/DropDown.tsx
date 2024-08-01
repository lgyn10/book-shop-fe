import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

interface IDropDownProps {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}

const DropDown = ({ children, toggleButton, isOpen = false }: IDropDownProps) => {
  const [open, setOpen] = useState(isOpen);

  //! useRef를 사용하여 패널 외부를 클릭하면 닫히도록 구현
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      // console.log(dropDownRef);
      // console.log(dropDownRef.current);
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        // 패널 외부를 클릭하면 닫힘
        setOpen(false);
      }
    }
    // add event listener
    document.addEventListener('mousedown', handleOutsideClick);

    // cleanup
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropDownRef]);

  return (
    <StyledDropDown $open={open} ref={dropDownRef}>
      <button className='toggle' onClick={() => setOpen((prev) => !prev)}>
        {toggleButton}
      </button>
      {open && <div className='panel'>{children}</div>}
    </StyledDropDown>
  );
};

export default DropDown;

interface IDropDownStyleProps {
  $open: boolean;
}

const StyledDropDown = styled.div<IDropDownStyleProps>`
  position: relative;
  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }
  svg {
    width: 30px;
    height: 30px;
    fill: ${({ theme, $open }) => ($open ? theme.color.primary : theme.color.text)};
  }
  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: 4px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;
