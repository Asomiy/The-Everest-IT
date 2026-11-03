export interface SeminarLead {
  id: string;
  ticketId: string;
  name: string;
  phone: string;
  email: string;
  courseInterest: string;
  preferredShift: 'In-Person (Shewrapara)' | 'Online (Zoom)';
  registrationDate: string;
  status: 'New Lead' | 'Contacted' | 'Verified' | 'Converted';
  notes?: string;
}

export const INITIAL_SEMINAR_LEADS: SeminarLead[] = [
  {
    id: 'lead-1',
    ticketId: 'EVR-SEM-841920',
    name: 'Tanvir Hossain Ridoy',
    phone: '01776057078',
    email: 'tanvir.ridoy@gmail.com',
    courseInterest: 'Graphic Design for Freelancing',
    preferredShift: 'In-Person (Shewrapara)',
    registrationDate: 'Nov 02, 2026 · 10:24 AM',
    status: 'New Lead',
    notes: 'Interested in Adobe Illustrator & Fiverr gig creation.'
  },
  {
    id: 'lead-2',
    ticketId: 'EVR-SEM-923145',
    name: 'Nusrat Jahan Mim',
    phone: '01812984512',
    email: 'mim.nusrat22@yahoo.com',
    courseInterest: 'Full-Stack Web Development (MERN)',
    preferredShift: 'Online (Zoom)',
    registrationDate: 'Nov 02, 2026 · 09:40 AM',
    status: 'Verified',
    notes: 'Computer Science 3rd year student. Wants career guidance.'
  },
  {
    id: 'lead-3',
    ticketId: 'EVR-SEM-561289',
    name: 'Mahmudul Hasan Shuvo',
    phone: '01934567890',
    email: 'shuvo.mahmud@gmail.com',
    courseInterest: 'Digital Marketing & SEO Mastery',
    preferredShift: 'In-Person (Shewrapara)',
    registrationDate: 'Nov 01, 2026 · 04:15 PM',
    status: 'Contacted',
    notes: 'Called by Counselor Naim. Confirmed physical attendance.'
  },
  {
    id: 'lead-4',
    ticketId: 'EVR-SEM-773412',
    name: 'Sadia Afrin',
    phone: '01678123456',
    email: 'sadia.afrin@outlook.com',
    courseInterest: 'UI/UX Product Design & Figma',
    preferredShift: 'In-Person (Shewrapara)',
    registrationDate: 'Nov 01, 2026 · 02:30 PM',
    status: 'Converted',
    notes: 'Enrolled in Batch 48 directly after seminar counseling!'
  },
  {
    id: 'lead-5',
    ticketId: 'EVR-SEM-332901',
    name: 'Rakibul Islam',
    phone: '01755667788',
    email: 'rakibul.is@gmail.com',
    courseInterest: 'Network & Cyber Security Engineering',
    preferredShift: 'In-Person (Shewrapara)',
    registrationDate: 'Oct 31, 2026 · 06:10 PM',
    status: 'Verified',
    notes: 'Wants to inspect physical Cisco hardware labs in Shewrapara.'
  },
  {
    id: 'lead-6',
    ticketId: 'EVR-SEM-129843',
    name: 'Fariha Tabassum',
    phone: '01533221100',
    email: 'fariha.tab@gmail.com',
    courseInterest: 'Graphic Design for Freelancing',
    preferredShift: 'Online (Zoom)',
    registrationDate: 'Oct 31, 2026 · 11:05 AM',
    status: 'New Lead',
    notes: 'Living outside Dhaka, prefers online hybrid session.'
  },
  {
    id: 'lead-7',
    ticketId: 'EVR-SEM-450912',
    name: 'Ashikur Rahman',
    phone: '01711223344',
    email: 'ashik.tech@gmail.com',
    courseInterest: 'Python, Django & Machine Learning',
    preferredShift: 'In-Person (Shewrapara)',
    registrationDate: 'Oct 30, 2026 · 03:50 PM',
    status: 'Contacted',
    notes: 'Interested in AI and Django microservices capstone project.'
  }
];

export interface AdminKpi {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: 'users' | 'book' | 'calendar' | 'creditCard';
}

export const ADMIN_KPIS: AdminKpi[] = [
  {
    title: 'Total Students',
    value: '4,280',
    change: '+14.2%',
    isPositive: true,
    timeframe: 'vs last month',
    iconName: 'users'
  },
  {
    title: 'Active Courses',
    value: '52',
    change: '+4 new',
    isPositive: true,
    timeframe: 'Batch 48 running',
    iconName: 'book'
  },
  {
    title: 'New Seminar Leads',
    value: '184',
    change: '+28.5%',
    isPositive: true,
    timeframe: 'this week',
    iconName: 'calendar'
  },
  {
    title: 'Monthly Revenue (৳)',
    value: '৳3,450,000',
    change: '+18.4%',
    isPositive: true,
    timeframe: 'Nov 2026 target 82%',
    iconName: 'creditCard'
  }
];

export interface StudentEnrollmentRecord {
  id: string;
  enrollmentId?: string;
  studentName: string;
  phone: string;
  course: string;
  batch: string;
  feePaid: number;
  totalFee: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank' | 'Campus Cash';
  date: string;
  status: 'Full Paid' | 'Partial (Installment)' | 'Pending Verification';
}

export const INITIAL_ENROLLMENTS: StudentEnrollmentRecord[] = [
  {
    id: 'ADM-8901',
    studentName: 'Sadia Afrin',
    phone: '01678123456',
    course: 'UI/UX Product Design & Figma',
    batch: 'Batch 48 (Fri & Sat)',
    feePaid: 12000,
    totalFee: 12000,
    paymentMethod: 'bKash',
    date: 'Nov 02, 2026',
    status: 'Full Paid'
  },
  {
    id: 'ADM-8902',
    studentName: 'Kamrul Ahsan',
    phone: '01712998877',
    course: 'Full-Stack Web Development (MERN)',
    batch: 'Batch 48 (Fri & Sat)',
    feePaid: 8000,
    totalFee: 15000,
    paymentMethod: 'Campus Cash',
    date: 'Nov 01, 2026',
    status: 'Partial (Installment)'
  },
  {
    id: 'ADM-8903',
    studentName: 'Tasnim Ferdous',
    phone: '01855443322',
    course: 'Graphic Design for Freelancing',
    batch: 'Batch 48 (Sun & Tue)',
    feePaid: 10000,
    totalFee: 10000,
    paymentMethod: 'Nagad',
    date: 'Oct 31, 2026',
    status: 'Full Paid'
  },
  {
    id: 'ADM-8904',
    studentName: 'Zubayer Hossain',
    phone: '01988776655',
    course: 'Network & Cyber Security Engineering',
    batch: 'Batch 47 (Active)',
    feePaid: 16000,
    totalFee: 16000,
    paymentMethod: 'Bank',
    date: 'Oct 30, 2026',
    status: 'Full Paid'
  }
];
