import React, { useState, useEffect } from 'react';
import { Member, WorkoutDay, DietMeal } from '../types';
import { generateWorkoutPlan, generateDietPlan } from '../services/geminiService';
import { Dumbbell, Calendar, Droplets, Trophy, ChevronRight, PlayCircle, Apple, Clock, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UserDashboardProps {
  member: Member;
  currentView: string;
}

const weightHistory = [
  { date: 'Jan', weight: 80 },
  { date: 'Feb', weight: 78.5 },
  { date: 'Mar', weight: 77 },
  { date: 'Apr', weight: 76.2 },
  { date: 'May', weight: 75 },
];

const UserDashboard: React.FC<UserDashboardProps> = ({ member, currentView }) => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[] | null>(null);
  const [dietPlan, setDietPlan] = useState<DietMeal[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Load plans from local storage on mount (simulated persistence)
  useEffect(() => {
    const savedWorkout = localStorage.getItem(`workout_${member.id}`);
    if (savedWorkout) setWorkoutPlan(JSON.parse(savedWorkout));
    
    const savedDiet = localStorage.getItem(`diet_${member.id}`);
    if (savedDiet) setDietPlan(JSON.parse(savedDiet));
  }, [member.id]);

  const handleGenerateWorkout = async () => {
    setLoading(true);
    const plan = await generateWorkoutPlan(member);
    setWorkoutPlan(plan);
    localStorage.setItem(`workout_${member.id}`, JSON.stringify(plan));
    setLoading(false);
  };

  const handleGenerateDiet = async () => {
    setLoading(true);
    const plan = await generateDietPlan(member);
    setDietPlan(plan);
    localStorage.setItem(`diet_${member.id}`, JSON.stringify(plan));
    setLoading(false);
  };

  if (currentView === 'workout') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">AI Workout Coach</h2>
            <p className="text-slate-400">Personalized routine based on your goal: <span className="text-emerald-400 font-semibold">{member.goal}</span></p>
          </div>
          <button 
            onClick={handleGenerateWorkout}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              loading 
                ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg shadow-emerald-500/20'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> 
                Generating...
              </span>
            ) : (
              <>
                <Dumbbell className="w-5 h-5" />
                Generate New Plan
              </>
            )}
          </button>
        </div>

        {!workoutPlan && !loading && (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
            <Dumbbell className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-300">No Plan Active</h3>
            <p className="text-slate-500 max-w-md mx-auto mt-2">Click generate to let our AI analyze your profile and build a custom routine.</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {workoutPlan?.map((day, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors">
              <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg text-emerald-400">{day.day}</h3>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">{day.focus}</span>
              </div>
              <div className="p-4 space-y-4">
                {day.exercises.map((ex, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-slate-200 group-hover:text-emerald-300 transition-colors">{ex.name}</p>
                      <button className="text-slate-600 hover:text-emerald-400"><PlayCircle className="w-4 h-4"/></button>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500">
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded">{ex.sets} Sets</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded">{ex.reps} Reps</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded flex items-center gap-1"><Clock className="w-3 h-3"/> {ex.rest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'diet') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Smart Nutrition</h2>
            <p className="text-slate-400">Fuel for your {member.weight}kg frame.</p>
          </div>
          <button 
            onClick={handleGenerateDiet}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              loading 
              ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
              : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-lg shadow-orange-500/20'
            }`}
          >
            {loading ? 'Thinking...' : <><Apple className="w-5 h-5" /> Generate Meal Plan</>}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Droplets className="text-blue-500" /> Hydration Tracker</h3>
            <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl">
               <div>
                 <p className="text-2xl font-bold text-blue-400">1.5L <span className="text-sm text-slate-500">/ 3.0L Goal</span></p>
                 <p className="text-xs text-slate-400 mt-1">Keep drinking water!</p>
               </div>
               <div className="flex gap-1">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className={`w-3 h-8 rounded-full ${i <= 3 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
                 ))}
               </div>
            </div>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Flame className="text-orange-500" /> Calorie Bank</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full border-8 border-slate-800 flex items-center justify-center relative">
                 <div className="absolute inset-0 border-8 border-orange-500 rounded-full border-t-transparent rotate-45"></div>
                 <div className="text-center">
                   <p className="text-sm font-bold">1200</p>
                   <p className="text-[10px] text-slate-500">Left</p>
                 </div>
              </div>
              <div>
                <p className="text-sm text-slate-400">Consumed: <span className="text-white font-medium">1300 kcal</span></p>
                <p className="text-sm text-slate-400">Goal: <span className="text-white font-medium">2500 kcal</span></p>
              </div>
            </div>
          </div>
        </div>

        {dietPlan && (
          <div className="grid lg:grid-cols-4 gap-4">
            {dietPlan.map((meal, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-orange-400">{meal.meal}</h4>
                  <span className="text-xs text-slate-500 font-mono">{meal.calories} kcal</span>
                </div>
                <p className="text-sm text-slate-300 mb-4 h-16 overflow-hidden">{meal.suggestion}</p>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 border-t border-slate-800 pt-3">
                  <div>
                    <span className="block text-slate-300 font-bold">{meal.protein}</span>
                    PRO
                  </div>
                  <div>
                    <span className="block text-slate-300 font-bold">{meal.carbs}</span>
                    CARB
                  </div>
                  <div>
                    <span className="block text-slate-300 font-bold">{meal.fats}</span>
                    FAT
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'checkin') {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-6">
        <h2 className="text-3xl font-bold text-white">Member Check-In</h2>
        <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-emerald-500/10">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${member.id}`} 
            alt="Member QR" 
            className="rounded-xl"
          />
        </div>
        <p className="text-slate-400 text-center max-w-sm">Scan this QR code at the gym entrance to log your attendance and earn reward points.</p>
        
        <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Activity</h3>
            <span className="text-emerald-400 text-sm font-medium">Streak: 3 Days 🔥</span>
          </div>
          <div className="space-y-3">
            {[1,2,3].map((_, i) => (
              <div key={i} className="flex justify-between text-sm py-2 border-b border-slate-800 last:border-0">
                <span className="text-slate-300">Checked in at Main Branch</span>
                <span className="text-slate-500">Today, 07:30 AM</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
         <img src={member.avatar} className="w-24 h-24 rounded-full border-4 border-slate-800" alt="Profile" />
         <div>
            <h1 className="text-3xl font-bold text-white">Hello, {member.name.split(' ')[0]}!</h1>
            <p className="text-slate-400">Let's crush your {member.goal.toLowerCase()} goals today.</p>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 rounded-xl"><Calendar className="w-6 h-6"/></div>
            <span className="bg-white/20 px-2 py-1 rounded text-xs">Today</span>
          </div>
          <p className="text-sm opacity-80">Next Workout</p>
          <h3 className="text-xl font-bold mt-1">Chest & Triceps Power</h3>
          <p className="text-sm mt-4 opacity-75">Scheduled for 18:00</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
           <h3 className="text-lg font-bold mb-4 text-white">Weight Progress</h3>
           <div className="h-32">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={weightHistory}>
                 <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                 <XAxis dataKey="date" hide />
               </LineChart>
             </ResponsiveContainer>
           </div>
           <div className="flex justify-between items-center mt-2">
             <span className="text-sm text-slate-400">Starting: 80kg</span>
             <span className="text-xl font-bold text-white">75kg</span>
           </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5"><Trophy className="w-32 h-32" /></div>
           <h3 className="text-lg font-bold mb-2">Rewards</h3>
           <div className="text-4xl font-bold text-amber-400 mb-1">2,450</div>
           <p className="text-sm text-slate-500 mb-6">FitPoints earned</p>
           <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
             Redeem Rewards <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
