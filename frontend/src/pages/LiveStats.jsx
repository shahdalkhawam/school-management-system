import PageHeader from '../components/layout/PageHeader';
import FeaturePlaceholder from '../components/ui/FeaturePlaceholder';

const sections = [
  {
    title: 'KPI Summary',
    description: 'High-level cards for attendance, enrollment, fees, and alerts can sit at the top of this page.',
  },
  {
    title: 'Realtime Activity',
    description: 'Recent approvals, sign-ins, requests, or incidents can be streamed here later.',
  },
  {
    title: 'Trend Panels',
    description: 'Charts and comparisons for school performance can be added once the data model is ready.',
  },
];

export default function LiveStats() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature Page"
        title="Live Stats"
        description="This page is reserved for realtime operational insight so administrators can monitor the system quickly and act with confidence."
      />
      <FeaturePlaceholder sections={sections} />
    </div>
  );
}
