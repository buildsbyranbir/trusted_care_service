import {
  Baby,
  User,
  HeartPulse,
  Users
} from 'lucide-react';

/* ================= SERVICES ================= */

export const SERVICES = [
  {
    id: 'babysitting',
    name: 'Baby Sitting',
    pricePerHour: 10,
    icon: 'baby',
    longDescription:
      'Professional and trusted baby sitting service to ensure your child’s safety and comfort.',
    features: [
      'Verified caregivers',
      'Safe & friendly care',
      'Flexible schedule',
      'Daily activity support'
    ]
  },
  {
    id: 'elderly-care',
    name: 'Elderly Care',
    pricePerHour: 12,
    icon: 'elderly',
    longDescription:
      'Compassionate elderly care with daily assistance and health monitoring.',
    features: [
      'Personal care support',
      'Medicine reminders',
      '24/7 availability',
      'Experienced staff'
    ]
  },
  {
    id: 'medical-care',
    name: 'Medical Care',
    pricePerHour: 15,
    icon: 'medical',
    longDescription:
      'Professional medical care at home by certified staff.',
    features: [
      'Certified nurses',
      'Health monitoring',
      'Emergency support',
      'Doctor consultation'
    ]
  },
  {
    id: 'family-care',
    name: 'Family Care',
    pricePerHour: 11,
    icon: 'family',
    longDescription:
      'Complete care solution for children, elderly, and special needs.',
    features: [
      'All-in-one care',
      'Trusted professionals',
      'Flexible timing',
      'Affordable pricing'
    ]
  }
];

/* ================= SERVICE ICONS ================= */

export const SERVICE_ICONS = {
  baby: <Baby className="w-10 h-10 text-teal-600" />,
  elderly: <User className="w-10 h-10 text-teal-600" />,
  medical: <HeartPulse className="w-10 h-10 text-teal-600" />,
  family: <Users className="w-10 h-10 text-teal-600" />
};

/* ================= LOCATION DATA ================= */

export const DIVISIONS = [
  {
    name: 'Dhaka',
    districts: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail']
  },
  {
    name: 'Chattogram',
    districts: ['Chattogram', 'Cox’s Bazar', 'Cumilla']
  },
  {
    name: 'Rajshahi',
    districts: ['Rajshahi', 'Bogura', 'Pabna']
  },
  {
    name: 'Khulna',
    districts: ['Khulna', 'Jessore', 'Satkhira']
  },
  {
    name: 'Sylhet',
    districts: ['Sylhet', 'Moulvibazar']
  }
];
