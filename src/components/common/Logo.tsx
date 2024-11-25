import React from 'react';

export const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" className="fill-primary/10 dark:fill-primary/20"/>
    {/* 쓰레기통 아이콘 */}
    <path 
      d="M12 14H28M26 14V28C26 29.1 25.1 30 24 30H16C14.9 30 14 29.1 14 28V14M18 14V12C18 10.9 18.9 10 20 10C21.1 10 22 10.9 22 12V14"
      className="stroke-primary dark:stroke-white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 회로 패턴 */}
    <path
      d="M16 18H24M16 22H24M16 26H24"
      className="stroke-primary dark:stroke-primary-400"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 2"
    />
  </svg>
);