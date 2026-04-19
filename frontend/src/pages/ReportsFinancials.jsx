import PageHeader from '../components/layout/PageHeader';
import FeaturePlaceholder from '../components/ui/FeaturePlaceholder';

const sections = [
  {
    title: 'Financial Overview',
    description: 'Fee collections, balances, and payment status summaries can be presented here.',
  },
  {
    title: 'Reports Library',
    description: 'Exportable administrative, academic, and financial reports can be organized in this area.',
  },
  {
    title: 'Forecasting and Trends',
    description: 'Longer-term trend cards and budget comparisons can be added here when financial data is connected.',
  },
];

export default function ReportsFinancials() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature Page"
        title="Reports and Financials"
        description="Use this section for reporting, payment visibility, exports, and broader financial monitoring."
      />
      <FeaturePlaceholder sections={sections} />
    </div>
  );
}
