import PageHeader from '../components/layout/PageHeader';
import FeaturePlaceholder from '../components/ui/FeaturePlaceholder';

const sections = [
  {
    title: 'Announcements',
    description: 'School-wide notices and targeted updates can be drafted and published here.',
  },
  {
    title: 'Requests Queue',
    description: 'Parent, student, or staff requests can be reviewed, approved, and tracked from this page.',
  },
  {
    title: 'Message Center',
    description: 'Internal communication workflows and notification history can be added in this area.',
  },
];

export default function CommunicationsRequests() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature Page"
        title="Communications and Requests"
        description="This feature page will coordinate outbound communication, internal messaging, and operational request handling."
      />
      <FeaturePlaceholder sections={sections} />
    </div>
  );
}
