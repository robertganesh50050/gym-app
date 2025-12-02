import React from 'react';
import { MOCK_MEMBERS } from '../constants';
import { Member, MemberStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react';

interface AdminDashboardProps {
  currentView: string;
}

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon className="w-24 h-24" />
    </div>
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-20 text-white`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
      <p className="text-xs text-slate-500 mt-2">{sub}</p>
    </div>
  </div>
);

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const statusData = [
  { name: 'Active', value: 3, color: '#10b981' },
  { name: 'Pending', value: 1, color: '#f59e0b' },
  { name: 'Expired', value: 1, color: '#ef4444' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentView }) => {
  if (currentView === 'members') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Member Management</h2>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Add New Member
          </button>
        </div>
        
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700">
                  <th className="p-4 font-semibold text-slate-300">Member</th>
                  <th className="p-4 font-semibold text-slate-300">Plan</th>
                  <th className="p-4 font-semibold text-slate-300">Join Date</th>
                  <th className="p-4 font-semibold text-slate-300">Status</th>
                  <th className="p-4 font-semibold text-slate-300">Attendance</th>
                  <th className="p-4 font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MOCK_MEMBERS.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-slate-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{member.plan}</td>
                    <td className="p-4 text-slate-400 text-sm">{member.joinDate}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        member.status === MemberStatus.ACTIVE ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        member.status === MemberStatus.PENDING ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${member.attendance}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{member.attendance}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button className="text-slate-400 hover:text-white transition-colors">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'payments') {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Financials</h2>
        <div className="grid md:grid-cols-3 gap-6">
           <StatCard title="Total Revenue" value="$45,231.89" sub="+12% from last month" icon={DollarSign} color="bg-emerald-600" />
           <StatCard title="Pending Invoices" value="12" sub="Totaling $1,200" icon={AlertCircle} color="bg-amber-600" />
           <StatCard title="Avg. Member Value" value="$89.00" sub="Per month" icon={TrendingUp} color="bg-blue-600" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6">Revenue History</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>
      </div>
    );
  }

  // Default Dashboard
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back, Boss.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Members" value="142" sub="+8 this week" icon={Users} color="bg-blue-600" />
        <StatCard title="Monthly Revenue" value="$8,245" sub="+15% vs last month" icon={DollarSign} color="bg-emerald-600" />
        <StatCard title="Active Plans" value="115" sub="85% retention" icon={TrendingUp} color="bg-purple-600" />
        <StatCard title="Alerts" value="3" sub="Payment overdue" icon={AlertCircle} color="bg-red-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Membership Distribution</h3>
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none' }} />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold">Recent Signups</h3>
             <button className="text-sm text-emerald-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {MOCK_MEMBERS.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/50">
                <img src={m.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="font-medium text-white">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.plan}</p>
                </div>
                <span className="text-xs text-slate-500">{m.joinDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
