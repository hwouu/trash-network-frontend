import React from 'react';

// 공통으로 사용할 베이스 맵
const BaseMap: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 배경 */}
    <rect width="800" height="800" className="fill-gray-100 dark:fill-gray-800" />
    
    {/* 비행기 */}
    <path 
      d="M600 100 L650 50 L700 100 L650 150 Z" 
      className="fill-blue-200 dark:fill-blue-800"
    />
    
    {/* 도서관 */}
    <rect x="500" y="50" width="120" height="80" className="fill-gray-300 dark:fill-gray-600" />
    <text x="560" y="90" textAnchor="middle" className="fill-gray-700 dark:fill-gray-200 text-sm">도서관</text>
    
    {/* 과학관 */}
    <rect x="250" y="100" width="200" height="120" className="fill-gray-300 dark:fill-gray-600" />
    <text x="350" y="160" textAnchor="middle" className="fill-gray-700 dark:fill-gray-200 text-sm">과학관</text>

    {/* 학생회관 */}
    <rect x="600" y="200" width="150" height="100" className="fill-gray-300 dark:fill-gray-600" />
    <text x="675" y="250" textAnchor="middle" className="fill-gray-700 dark:fill-gray-200 text-sm">학생회관</text>
    
    {/* 강의동 */}
    <rect x="350" y="350" width="200" height="150" className="fill-gray-300 dark:fill-gray-600" />
    <text x="450" y="425" textAnchor="middle" className="fill-gray-700 dark:fill-gray-200 text-sm">강의동</text>

    {/* 전자관/기계관/과학관 */}
    <rect x="600" y="400" width="150" height="200" className="fill-gray-300 dark:fill-gray-600" />
    <text x="675" y="500" textAnchor="middle" className="fill-gray-700 dark:fill-gray-200 text-sm">전자관/기계관</text>

    {/* 도로/길 */}
    <path
      d="M200 90 H500 M340 220 V350 M675 300 V400 M450 500 H650"
      className="stroke-gray-400 dark:stroke-gray-500"
      strokeWidth="4"
    />
    
    {/* 캠퍼스 경계 */}
    <rect 
      x="10" 
      y="10" 
      width="780" 
      height="780" 
      className="stroke-gray-300 dark:stroke-gray-600" 
      strokeWidth="2" 
      fill="none"
    />
  </svg>
);

export const CampusMapModule1: React.FC = () => (
  <div className="relative w-full h-full">
    <BaseMap />
    <div className="absolute top-[160px] left-[350px] transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
    </div>
  </div>
);

export const CampusMapModule2: React.FC = () => (
  <div className="relative w-full h-full">
    <BaseMap />
    <div className="absolute top-[425px] left-[450px] transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
    </div>
  </div>
);

export const CampusMapModule3: React.FC = () => (
  <div className="relative w-full h-full">
    <BaseMap />
    <div className="absolute top-[250px] left-[675px] transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
    </div>
  </div>
);