import { Member, MemberStatus } from './types';

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    joinDate: '2023-01-15',
    status: MemberStatus.ACTIVE,
    plan: 'Yearly Pro',
    avatar: 'https://picsum.photos/100/100?random=1',
    weight: 75,
    height: 180,
    goal: 'Muscle Gain',
    attendance: 88,
    medicalConditions: 'None'
  },
  {
    id: '2',
    name: 'Sarah Connor',
    email: 'sarah.c@example.com',
    joinDate: '2023-03-10',
    status: MemberStatus.ACTIVE,
    plan: 'Quarterly',
    avatar: 'https://picsum.photos/100/100?random=2',
    weight: 62,
    height: 165,
    goal: 'Endurance',
    attendance: 95,
    medicalConditions: 'Knee injury (recovered)'
  },
  {
    id: '3',
    name: 'Mike Tyson',
    email: 'iron.mike@example.com',
    joinDate: '2023-06-05',
    status: MemberStatus.EXPIRED,
    plan: 'Monthly',
    avatar: 'https://picsum.photos/100/100?random=3',
    weight: 95,
    height: 178,
    goal: 'Weight Loss',
    attendance: 40,
  },
  {
    id: '4',
    name: 'Emily Blunt',
    email: 'emily.b@example.com',
    joinDate: '2023-11-20',
    status: MemberStatus.PENDING,
    plan: 'Monthly',
    avatar: 'https://picsum.photos/100/100?random=4',
    weight: 58,
    height: 170,
    goal: 'Tone Up',
    attendance: 0,
  }
];

export const PLANS = [
  { id: 'p1', name: 'Monthly Basic', price: 29.99 },
  { id: 'p2', name: 'Quarterly Silver', price: 79.99 },
  { id: 'p3', name: 'Yearly Pro', price: 299.99 },
];
