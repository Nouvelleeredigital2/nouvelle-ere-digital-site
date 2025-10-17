'use client';

import React, { useState } from 'react';

interface Tab {
  title: string;
  content: string;
}

interface TabsBlockData {
  title?: string;
  tabs?: Tab[];
}

interface TabsBlockProps {
  data: TabsBlockData;
}

export function TabsBlock({ data }: TabsBlockProps) {
  const {
    title = '',
    tabs = [],
  } = data;

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            {title}
          </h2>
        )}

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === index
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: tabs[activeTab]?.content || '' }}
          />
        </div>
      </div>
    </section>
  );
}
