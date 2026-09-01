import * as React from 'react';
import { Badge } from '@fluentui/react-components';
import { stateLabel } from '../../../services/classification';
import { WorkflowRequest } from '../models';

export function StatusPill({ request }: { request: WorkflowRequest }): React.ReactElement {
  const appearance = request.state === 'completed' ? 'filled' : request.state === 'failed' ? 'tint' : 'outline';
  return <Badge appearance={appearance} color={request.overdue ? 'danger' : request.state === 'completed' ? 'success' : request.state === 'failed' ? 'danger' : 'informative'} aria-label={stateLabel(request)}>{stateLabel(request)}</Badge>;
}
