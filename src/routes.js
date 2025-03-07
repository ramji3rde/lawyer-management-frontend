import React from 'react';
import $ from 'jquery';
import CalendarContainer from './App/containers/Calendar';
import AdminDashboard from './Demo/Dashboard/Admin';
import LawyerManagement from './App/containers/LawyerManagement';
import LawyerDetail from './App/containers/LawyerDetailPage';
import Logout from './App/components/Logout';
import FeaturesManage from './App/containers/ContentManagement/Features';
import PlansManage from './App/containers/ContentManagement/Plans';
import BlogsManage from './App/containers/ContentManagement/Blogs';
import ManageTestimonials from './App/containers/ContentManagement/Testimonials/testimonials';
import AddEditBlogs from './App/components/ContentManagePartials/AddEditBlog';
import ManageAbout from './App/components/ContentManagePartials/About';
import ManageContactUs from './App/components/ContentManagePartials/Contactus';
import AddEditFeatures from './App/components/ContentManagePartials/AddEditFeature';
import AddEditPlans from './App/components/ContentManagePartials/AddEditPlan';
import footer from './App/containers/ContentManagement/footer/footer'
import Accounts from './App/containers/Accounts';
import Documents from './App/containers/Documents';
import Support from './App/containers/Support/Support';
import HelpCenter from './App/containers/HelpCenter';
import HelpForm from './App/containers/HelpCenter/HelpForm';
import SupportManagement from './App/containers/SupportManagement';
import SubscriptionManagement from './App/containers/SubscriptionManagement'

// import Profile from './App/containers/Profile';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const TakeATour = React.lazy(() => import('./App/containers/tour/tour'));
const SubscriptionPage = React.lazy(() => import('./App/containers/Subscription/Subscription'));

const UIBasicButton = React.lazy(() =>
  import('./Demo/UIElements/Basic/Button')
);
const UIBasicBadges = React.lazy(() =>
  import('./Demo/UIElements/Basic/Badges')
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import('./Demo/UIElements/Basic/BreadcrumbPagination')
);

const UIBasicCollapse = React.lazy(() =>
  import('./Demo/UIElements/Basic/Collapse')
);
const UIBasicTabsPills = React.lazy(() =>
  import('./Demo/UIElements/Basic/TabsPills')
);
const UIBasicBasicTypography = React.lazy(() =>
  import('./Demo/UIElements/Basic/Typography')
);

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));
const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));
const tasks = React.lazy(() => import('./App/containers/Tasks/index'));
const list = React.lazy(() => import('./App/containers/Tasks/List/viewList/listView'));
const Profile = React.lazy(() => import('./App/containers/Profile'));
const Login = React.lazy(() => import('./App/containers/Auth/Login'));

// const Calendar = React.lazy(()=> import('./Demo/Calendar/CalendarElements'));

const ContactsManage = React.lazy(() =>
  import('./App/containers/ContactManagement')
);
const AddPerson = React.lazy(() =>
  import('./App/components/AddEditContact/AddPerson')
);
const AddCompany = React.lazy(() =>
  import('./App/components/AddEditContact/AddCompany/index')
);
const EditPerson = React.lazy(() =>
  import('./App/components/AddEditContact/EditPerson')
);
const EditCompany = React.lazy(() =>
  import('./App/components/AddEditContact/AddCompany/EditCompany')
);
const ViewContact = React.lazy(() =>
  import('./App/containers/ContactManagement/ViewContact/ViewContact')
);
const ViewCompany = React.lazy(() =>
  import('./App/containers/ContactManagement/ViewContact/ViewCompany')
);
const Matter = React.lazy(() => import('./App/containers/Matter/Matter'));
const communication = React.lazy(() =>
  import('./App/containers/Communication/communication')
);
const Billing = React.lazy(() => import('./App/containers/Billings/billing'));
const Activity = React.lazy(() =>
  import('./App/containers/Activities/Activity')
);
const AddMatter = React.lazy(() =>
  import('./App/components/AddEditMatter/AddMatter')
);
const Invoice = React.lazy(() => import('./App/components/Invoice/Invoice'));
const SubscriptonInvoice = React.lazy(() => import('./App/containers/SubscriptionManagement/Invoice'));
const EditMatter = React.lazy(() =>
  import('./App/components/AddEditMatter/EditMatter')
);
const RecordPayment = React.lazy(() =>
  import('./App/components/Recordpayment/recordPayment')
);
const ViewMatter = React.lazy(() =>
  import('./App/containers/Matter/VIewMatter/ViewMatter')
);
const Bills = React.lazy(() =>
  import('./App/containers/Matter/VIewMatter/AcitivityBills')
);
const CreateBills = React.lazy(() =>
  import('./App/containers/Billings/CreateBills/CreateBill')
);
const Settings = React.lazy(() => import('./App/containers/Settings/index'));
const customFeilds = React.lazy(() =>
  import('./App/containers/Settings/CustomFeilds/CustomFeilds')
);
const accountNpayment = React.lazy(() =>
  import('./App/containers/Settings/account&payment/index')
);
const AddAccount = React.lazy(() =>
  import('./App/components/AddEditAccount/AddAccount')
);
const EditAccount = React.lazy(() =>
  import('./App/components/AddEditAccount/EditAccount')
);
const profile = React.lazy(() =>
  import('./App/containers/Settings/profile/index')
);
const Reports = React.lazy(() =>
  import('./App/containers/Reports/index')
);
const viewTicket = React.lazy(() =>
  import('./App/containers/SupportManagement/ViewTicket/view')
);
const viewFolder = React.lazy(() =>
  import('./App/containers/Documents/ViewFolder')
);
const AddTestimonials = React.lazy(() =>
  import('./App/components/ContentManagePartials/testimonials/testimonials')
);

const viewSubscription = React.lazy(() => import('./App/containers/SubscriptionManagement/ViewTicket/view'))


const Target = React.lazy(() => import('./App/containers/Target'));
const Statement = React.lazy(() => import('./App/containers/Accounts/Statement'));
const AddEditFAQ = React.lazy(() => import('./App/components/AddEditFAQ/index'));
const ManageFirm = React.lazy(() => import('./App/containers/ManageFirm/index'));

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    exact: true,
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/lawyers',
    exact: true,
    name: 'Lawyer Management',
    component: LawyerManagement,
  },
  {
    path: '/support',
    exact: true,
    name: 'Support',
    component: SupportManagement,
  },
  {
    path: '/lawyer/details',
    exact: true,
    name: 'Lawyer Details',
    component: LawyerDetail,
  },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  {
    path: '/basic/button',
    exact: true,
    name: 'Basic Button',
    component: UIBasicButton,
  },
  { path: '/logout', exact: true, name: 'Logout', component: Logout },
  {
    path: '/login/:lawyer',
    exact: true,
    name: 'Lawyer Login',
    component: Login,
  },
  {
    path: '/manage/testimonials',
    exact: true,
    name: 'Manage Testimonials',
    component: ManageTestimonials,
  },
  {
    path: '/manage/testimonials/:manage',
    exact: true,
    name: 'Manage Testimonials',
    component: AddTestimonials,
  },
  {
    path: '/manage/blogs',
    exact: true,
    name: 'Manage Blogs',
    component: BlogsManage,
  },

  {
    path: '/manage/features',
    exact: true,
    name: 'Manage Features',
    component: FeaturesManage,
  },
  {
    path: '/manage/FAQ',
    exact: true,
    name: 'Manage FAQ',
    component: AddEditFAQ,
  },
  {
    path: '/manage/plans',
    exact: true,
    name: 'Manage Plans',
    component: PlansManage,
  },
  {
    path: '/manage/blogs/:manage',
    exact: true,
    name: 'Add Edit Blogs',
    component: AddEditBlogs,
  },
  {
    path: '/manage/about',
    exact: true,
    name: 'Edit About',
    component: ManageAbout,
  },
  {
    path: '/manage/contactus',
    exact: true,
    name: 'Edit Contact Us',
    component: ManageContactUs,
  },
  {
    path: '/manage/features/:manage',
    exact: true,
    name: 'Add Edit Features',
    component: AddEditFeatures,
  },
  {
    path: '/manage/plans/:manage',
    exact: true,
    name: 'Add Edit Plans',
    component: AddEditPlans,
  },
  {
    path: '/manage/footer',
    exact: true,
    name: 'Add Edit footer',
    component: footer,
  },
  {
    path: '/manage/subscription',
    exact: true,
    name: 'Manage Subscription',
    component: SubscriptionManagement,
  },
  {
    path: '/subscription/invoice',
    exact: true,
    name: 'Subscription Invoice',
    component: SubscriptonInvoice,
  },
  {
    path: '/view/subscription',
    exact: true,
    name: 'view Subscription',
    component: viewSubscription,
  },
  {
    path: '/view/ticket',
    exact: true,
    name: 'view ticket',
    component: viewTicket,
  },

  // { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
  // { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
  // { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
  // { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
  // { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
  // { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
  // { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
  // { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
  // { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
  // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
  // { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
  // { path: '/calendar', exact: true, name: 'Calendar', component: CalendarContainer}
];
const routes = [
  {
    path: '/dashboard/default',
    exact: true,
    name: 'Default',
    component: DashboardDefault,
  },
  {
    path: '/manage/firm',
    exact: true,
    name: 'Default',
    component: ManageFirm,
  },

  {
    path: '/tour',
    exact: true,
    name: 'Default',
    component: TakeATour,
  },

  { path: '/tasks', exact: true, name: 'Tasks', component: tasks },
  { path: '/tasks/view/list', exact: true, name: 'View List', component: list },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  {
    path: '/basic/button',
    exact: true,
    name: 'Basic Button',
    component: UIBasicButton,
  },
  {
    path: '/account/statements',
    exact: true,
    name: 'Account Statement',
    component: Statement,
  },
  {
    path: '/basic/badges',
    exact: true,
    name: 'Basic Badges',
    component: UIBasicBadges,
  },
  {
    path: '/plans/subscription',
    exact: true,
    name: 'subscription',
    component: SubscriptionPage,
  },
  {
    path: '/documents/view',
    exact: true,
    name: 'View Folder',
    component: viewFolder,
  },
  {
    path: '/basic/breadcrumb-paging',
    exact: true,
    name: 'Basic Breadcrumb Pagination',
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: '/basic/collapse',
    exact: true,
    name: 'Basic Collapse',
    component: UIBasicCollapse,
  },
  {
    path: '/basic/tabs-pills',
    exact: true,
    name: 'Basic Tabs & Pills',
    component: UIBasicTabsPills,
  },
  {
    path: '/basic/typography',
    exact: true,
    name: 'Basic Typography',
    component: UIBasicBasicTypography,
  },
  {
    path: '/forms/form-basic',
    exact: true,
    name: 'Forms Elements',
    component: FormsElements,
  },
  {
    path: '/tables/bootstrap',
    exact: true,
    name: 'Bootstrap Table',
    component: BootstrapTable,
  },
  {
    path: '/charts/nvd3',
    exact: true,
    name: 'Nvd3 Chart',
    component: Nvd3Chart,
  },
  {
    path: '/maps/google-map',
    exact: true,
    name: 'Google Map',
    component: GoogleMap,
  },
  {
    path: '/sample-page',
    exact: true,
    name: 'Sample Page',
    component: OtherSamplePage,
  },
  { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
  {
    path: '/calendar',
    exact: true,
    name: 'Calendar',
    component: CalendarContainer,
  },
  { path: '/logout', exact: true, name: 'Logout', component: Logout },
  {
    path: '/manage/matter',
    exact: true,
    name: 'Manage Matter',
    component: Matter,
  },
  {
    path: '/manage/activity',
    exact: true,
    name: 'Activity',
    component: Activity,
  },
  { path: '/manage/billing', exact: true, name: 'Billing', component: Billing },
  {
    path: '/manage/communication',
    exact: true,
    name: 'Comminication',
    component: communication,
  },
  {
    path: '/manage/billing/record',
    exact: true,
    name: 'Record Payment',
    component: RecordPayment,
  },
  {
    path: '/manage/matter/:manage',
    exact: true,
    name: 'Add Edit Matter',
    component: AddMatter,
  },
  {
    path: '/edit/matter',
    exact: true,
    name: 'Edit Matter',
    component: EditMatter,
  },
  {
    path: '/view/matter',
    exact: true,
    name: 'Manage Matter',
    component: ViewMatter,
  },
  {
    path: '/view/matter/bills',
    exact: true,
    name: 'Bills for a Matter',
    component: Bills,
  },
  {
    path: '/create/bills',
    exact: true,
    name: 'Bills',
    component: CreateBills,
  },
  {
    path: '/view/matter/invoice',
    exact: true,
    name: 'Invoice',
    component: Invoice,
  },

  { path: '/settings', exact: true, name: 'Settings', component: Settings },
  {
    path: '/settings/customFeilds',
    exact: true,
    name: 'Custom Feilds',
    component: customFeilds,
  },
  {
    path: '/settings/account&payment',
    exact: true,
    name: 'Account And Payment',
    component: accountNpayment,
  },
  {
    path: '/manage/contacts/:manage/Person',
    exact: true,
    name: 'Add Edit Contact',
    component: AddPerson,
  },
  {
    path: '/manage/contacts/:manage/Company',
    exact: true,
    name: 'Add Edit Contact',
    component: AddCompany,
  },
  {
    path: '/edit/contact',
    exact: true,
    name: 'Add Edit Contact',
    component: EditPerson,
  },
  {
    path: '/edit/company',
    exact: true,
    name: 'Add Edit Contact',
    component: EditCompany,
  },
  {
    path: '/manage/contacts',
    exact: true,
    name: 'Contacts Management',
    component: ContactsManage,
  },
  {
    path: '/view/contact',
    exact: true,
    name: 'Contacts Management',
    component: ViewContact,
  },
  {
    path: '/view/company',
    exact: true,
    name: 'Contacts Management',
    component: ViewCompany,
  },
  { path: '/accounts', exact: true, name: 'Accounts', component: Accounts },
  {
    path: '/add/accounts',
    exact: true,
    name: 'Add Accounts',
    component: AddAccount,
  },
  {
    path: '/edit/accounts',
    exact: true,
    name: 'Edit Account',
    component: EditAccount,
  },
  { path: '/documents', exact: true, name: 'Documents', component: Documents },
  {
    path: '/settings/profile',
    exact: true,
    name: 'Profile',
    component: profile,
  },
  { path: '/support', exact: true, name: 'Support', component: Support },
  { path: '/help', exact: true, name: 'Help', component: HelpCenter },
  {
    path: '/help/createticket',
    exact: true,
    name: 'Help',
    component: HelpForm,
  },
  {
    path: '/target',
    exact: true,
    name: 'Target',
    component: Target,
  },
  {
    path: '/reports',
    exact: true,
    name: 'Reports',
    component: Reports,
  },
];

export default routes;
