// components/blocks/TabsBlock.tsx
'use client';

import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BlockRenderer } from './BlockRenderer';

interface Block {
  id: string;
  type: string;
  data: any;
}

interface TabsBlockData {
  tabs: Array<{
    id: string;
    title: string;
    content: Block[];
    icon?: string;
  }>;
  defaultTab?: string;
  orientation?: 'horizontal' | 'vertical';
  tabStyle?: 'default' | 'pills' | 'underline';
  title?: string;
  description?: string;
}

interface TabsBlockProps {
  data: TabsBlockData;
}

export function TabsBlock({ data }: TabsBlockProps) {
  const {
    tabs = [],
    defaultTab,
    orientation = 'horizontal',
    tabStyle = 'default',
    title = '',
    description = '',
  } = data;

  const [activeTab, setActiveTab] = useState(
    defaultTab || tabs[0]?.id || ''
  );

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  if (tabs.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-muted-foreground0">
            <p>Aucun onglet configuré</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        <Tabs
          selectedIndex={tabs.findIndex(tab => tab.id === activeTab)}
          onSelect={(index) => setActiveTab(tabs[index]?.id || '')}
          className={`tabs-${orientation}`}
        >
          {/* Tab Navigation */}
          <TabList className={`flex ${orientation === 'vertical' ? 'flex-col w-64 mr-8' : 'mb-8 border-b'}`}>
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className="px-6 py-3 text-sm font-medium transition-colors cursor-pointer text-muted-foreground hover:text-muted-foreground border-b-2 border-transparent hover:border-border"
              >
                {tab.icon && (
                  <span className="mr-2">{tab.icon}</span>
                )}
                <span>{tab.title}</span>
              </Tab>
            ))}
          </TabList>

          {/* Tab Content */}
          {tabs.map((tab) => (
            <TabPanel key={tab.id} className="tab-content">
              <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
                <BlockRenderer blocks={tab.content} />
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>

      <style jsx>{`
        .react-tabs__tab-list {
          margin: 0;
          padding: 0;
          display: flex;
          ${orientation === 'vertical' ? 'flex-direction: column;' : ''}
        }

        .react-tabs__tab {
          list-style: none;
          ${orientation === 'vertical' ? 'margin-bottom: 0.5rem;' : 'margin-right: 0.5rem;'}
        }

        .react-tabs__tab--selected {
          color: rgb(99 102 241);
          border-bottom-color: rgb(99 102 241);
          background-color: rgb(238 242 255);
        }

        .react-tabs__tab-panel {
          display: none;
        }

        .react-tabs__tab-panel--selected {
          display: block;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .react-tabs__tab:focus {
          outline: 2px solid rgb(99 102 241);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
