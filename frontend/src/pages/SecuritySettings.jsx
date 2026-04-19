import PageHeader from '../components/layout/PageHeader';
import FeaturePlaceholder from '../components/ui/FeaturePlaceholder';

const sections = [
  {
    title: 'Access Control',
    description: 'Permission groups, account policies, and security roles will be managed here.',
  },
  {
    title: 'System Preferences',
    description: 'General platform settings, language preferences, and administrative rules can be configured here.',
  },
  {
    title: 'Audit Trail',
    description: 'Administrative actions and sensitive changes can be surfaced in an audit panel in this section.',
  },
];

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature Page"
        title="Security and Settings"
        description="Keep all security-sensitive controls and system-wide settings together in a single administration workspace."
      />
      <FeaturePlaceholder sections={sections} />
    </div>
  );
}
