import * as React from 'react';
import { Timeline } from '@mantine/core';
import { EmployeeOnboarding } from '../../../types/Components.Types';

interface OnboardingTimelineProps {
  data: EmployeeOnboarding[];
}

const OnboardingTimeline: React.FC<OnboardingTimelineProps> = ({ data }) => {
  return (
    <Timeline color="lime" lineWidth={2} bulletSize={26}>
      <Timeline.Item title="User Department" color="blue" bullet={data.length > 0 ? "✅" : ""}>
        Updating user department
      </Timeline.Item>
      <Timeline.Item title="Join Microsoft Team" color="blue" bullet={data.length > 0 ? "✅" : ""}>
        Assigning user to user department Team
      </Timeline.Item>
      <Timeline.Item title="Notification" color="blue" bullet={data.length > 0 ? "✅" : ""}>
        Notify user via email
      </Timeline.Item>
    </Timeline>
  );
};

export default OnboardingTimeline;