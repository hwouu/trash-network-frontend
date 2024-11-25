// src/pages/Settings.tsx
import React from "react";

export const Settings = () => {
  return (
    <div className="space-y-2 mb-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Settings
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        알림 설정, 데이터 갱신 주기 등 시스템 설정을 관리할 수 있습니다.
      </p>
    </div>
  );
};
