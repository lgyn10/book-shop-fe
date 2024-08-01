import React, { useState } from 'react';
import { styled } from 'styled-components';

//! 처음보는 코드 패턴 : 두 개의 컴포넌트를 export하는 코드

//! Tab
interface ITabProps {
  title: string;
  children: React.ReactNode;
}

const Tab = ({ children }: ITabProps) => {
  return <>{children}</>;
};

//! Tabs
interface ITabsProps {
  children: React.ReactNode; // Tab 컴포넌트를 children으로 받음
}

const Tabs = ({ children }: ITabsProps) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const tabs = React.Children.toArray(children) as React.ReactElement<ITabProps>[];
  // React.ReactElement<ITabsProps>[] : ITabsProps 타입을 가진 ReactElement 배열
  // 즉, tabs는 Tab 컴포넌트의 배열

  console.log(tabs);

  return (
    <StyledTabs>
      <div className='tab-header'>
        {tabs.map((tab, idx) => (
          <button onClick={() => setActiveIdx(idx)} className={activeIdx === idx ? 'active' : ''}>
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className='tab-content'>{tabs[activeIdx]}</div>
    </StyledTabs>
  );
};

export { Tab, Tabs };
const StyledTabs = styled.div`
  .tab-header {
    display: flex;
    gap: 0.125rem;
    border-bottom: 1px solid #ddd;

    button {
      border: none;
      background: #ddd;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default} ${({ theme }) => theme.borderRadius.default} 0 0;
      padding: 12px 24px;
      &.active {
        color: #fff;
        background-color: ${({ theme }) => theme.color.primary};
      }
    }
  }
  .tab-content {
    padding-block: 1rem;
  }
`;
