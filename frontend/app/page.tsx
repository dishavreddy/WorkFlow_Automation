'use client';

import { useState } from 'react';
import { useAgentState } from '../lib/useAgentState';
import { Sidebar, SidebarSection } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { StatsRow } from '../components/StatsRow';
import { ModuleColumn } from '../components/ModuleColumn';
import { ApprovalPanel } from '../components/ApprovalPanel';
import { Item } from '../lib/mockData';

export default function Dashboard() {
  const { approvals, stats, lists, approve, discard } = useAgentState();
  const [activeSection, setActiveSection] = useState<SidebarSection>('Dashboard');
  const [period, setPeriod] = useState('This Month');
  const [statsVisible, setStatsVisible] = useState(true);

  const calendarItems: Item[] = [
    {
      id: 'c1',
      title: 'Marketing sync',
      subtitle: 'Prepared invite',
      status: 'draft',
      timestamp: 'Tue 11:00 AM',
    },
    {
      id: 'c2',
      title: 'Customer follow-up',
      subtitle: 'Calendar hold ready',
      status: 'pending',
      timestamp: 'Thu 3:30 PM',
    },
  ];

  const moduleMap: Record<Exclude<SidebarSection, 'Dashboard'>, Item[]> = {
    Emails: lists.emails,
    Meetings: lists.meetings,
    Tasks: lists.tasks,
    Calendar: calendarItems,
  };

  const moduleTitle = activeSection === 'Dashboard' ? 'Emails' : activeSection;
  const moduleItems = activeSection === 'Dashboard' ? lists.emails : moduleMap[activeSection];
  const openModule = (section: SidebarSection) => {
    setStatsVisible(true);
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen bg-[#0F1117]">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="ml-[220px] flex-1">
        <div className="max-w-6xl mx-auto py-8 px-8">
          <TopBar
            period={period}
            statsVisible={statsVisible}
            onPeriodChange={setPeriod}
            onToggleStats={() => setStatsVisible((visible) => !visible)}
            onAddWidget={() => {
              setStatsVisible(true);
              setActiveSection('Dashboard');
            }}
          />

          {statsVisible && (
            <StatsRow
              stats={stats}
              onOpenInsights={() => openModule('Meetings')}
              onOpenEmails={() => openModule('Emails')}
              onOpenTasks={() => openModule('Tasks')}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ModuleColumn
                title={moduleTitle}
                items={moduleItems}
                onOpen={() => openModule(moduleTitle as SidebarSection)}
              />
            </div>

            <div className="lg:col-span-1">
              <ApprovalPanel
                approvals={approvals}
                onApprove={approve}
                onDiscard={discard}
                onOpen={() => openModule('Tasks')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
