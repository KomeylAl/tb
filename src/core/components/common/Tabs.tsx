import React, { useState, ReactElement } from "react";

interface TabProps {
  label: string;
  children: React.ReactNode;
  defaultTab?: boolean;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
}

const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(() => {
    const defaultChild = children.find(
        (child) => child.props.defaultTab
    );
    return defaultChild ? defaultChild.props.label : children[0].props.label;
  });

  const handleClick = (
      e: React.MouseEvent<HTMLButtonElement>,
      newActiveTab: string
  ) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
      <div className="w-full mx-auto">
        <div className="flex items-center justify-start w-[640px]">
          {children.map((child) => (
              <button
                  key={child.props.label}
                  className={`${
                      activeTab === child.props.label
                          ? "border-b-2 border-blue-700 text-blue-700"
                          : ""
                  } flex-1 text-gray-700 dark:text-white font-medium py-2`}
                  onClick={(e) => handleClick(e, child.props.label)}
              >
                {child.props.label}
              </button>
          ))}
        </div>
        <div className="py-4">
          {children.map((child) =>
              child.props.label === activeTab ? (
                  <div key={child.props.label}>{child.props.children}</div>
              ) : null
          )}
        </div>
      </div>
  );
};

const Tab = ({ children, defaultTab }: TabProps) => {
  return (
      <div className="hidden" data-default-tab={defaultTab}>
        {children}
      </div>
  );
};

export { Tabs, Tab };
