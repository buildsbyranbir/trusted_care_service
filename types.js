import React from 'react';
import { Baby, HeartPulse, UserRound } from 'lucide-react';

export const SERVICES = [
  {
    id: 'baby-care',
    name: 'Baby Care',
    description: 'Expert babysitting and early childhood care for your little ones.',
    pricePerHour: 15,
    icon: 'Baby',
    longDescription:
      'Our certified baby care professionals provide nurturing and safe care.',
    features: [
      'Experienced Nannies',
      'Age-appropriate engagement',
      'Nutritional meal prep',
      'Daily activity logs'
    ]
  },
  {
    id: 'elderly-care',
    name: 'Elderly Care',
    description: 'Compassionate assistance for senior family members.',
    pricePerHour: 20,
    icon: 'UserRound',
    longDescription:
      'Providing dignity and comfort with professional elderly care.',
    features: [
      'Medication management',
      'Mobility assistance',
      'Companionship',
      'Light household help'
    ]
  },
  {
    id: 'sick-care',
    name: 'Sick People Care',
    description: 'Professional support for recovering patients.',
    pricePerHour: 25,
    icon: 'HeartPulse',
    longDescription:
      'Specialized care for patients managing illness or recovery.',
    features: [
      'Post-surgery recovery',
      'Vital signs monitoring',
      'Physical therapy assistance',
      'Doctor coordination'
    ]
  }
];

export const SERVICE_ICONS = {
  Baby: <Baby className="w-8 h-8 text-teal-600" />,
  UserRound: <UserRound className="w-8 h-8 text-blue-600" />,
  HeartPulse: <HeartPulse className="w-8 h-8 text-rose-600" />
};

export const DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh'
];
