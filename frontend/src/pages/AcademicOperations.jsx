import PageHeader from '../components/layout/PageHeader';
import FeaturePlaceholder from '../components/ui/FeaturePlaceholder';

const sections = [
  {
    title: 'Classes and Sections',
    description: 'Manage class structures, subjects, sections, and academic assignments.',
  },
  {
    title: 'Attendance and Scheduling',
    description: 'This space will hold timetables, attendance shortcuts, and teaching schedules.',
  },
  {
    title: 'Enrollment Flow',
    description: 'Admission, transfers, and academic progression actions can be built here next.',
  },
];

export default function AcademicOperations() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature Page"
        title="Academic Operations"
        description="Use this section to organize the school academic engine, from schedules and attendance to enrollment and class operations."
      />
      <FeaturePlaceholder sections={sections} />
    </div>
  );
}
