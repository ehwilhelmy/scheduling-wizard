import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Info, Users } from "lucide-react";

// Demo Data
const people = {
  dave: { name: "Dave Chen", avatar: "https://i.pravatar.cc/32?img=12", initials: "DC" },
  oren: { name: "Oren Friedman", avatar: "https://i.pravatar.cc/32?img=24", initials: "OF" },
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function makeDay(person, day, availabilityBlocks, rec) {
  // availabilityBlocks = list of half-hour indices that are available (0..23 for demo brevity)
  const slots = Array.from({ length: 24 }, (_, i) => ({ idx: i, available: availabilityBlocks.includes(i) }));
  // mark recommended (first N available slots)
  let n = rec;
  for (const s of slots) {
    if (n <= 0) break;
    if (s.available) {
      s.recommended = true;
      n -= 1;
    }
  }
  return { person, day, slots, recommendedCount: rec };
}

// Quick helper to generate a weekly matrix for research study availability
const weekly = [
  makeDay("dave", "Mon", [2,3,4, 8,9,10, 14,15,16], 3),
  makeDay("dave", "Tue", [1,2,3,4, 9,10, 15,16,17], 4),
  makeDay("dave", "Wed", [2,3,4, 8,9,10, 14,15,16], 4),
  makeDay("dave", "Thu", [1,2,3,4,5, 10,11, 16,17], 4),
  makeDay("dave", "Fri", [3,4,5, 11,12,13], 3),

  makeDay("oren", "Mon", [4,5,6, 12,13, 18,19], 2),
  makeDay("oren", "Tue", [2,3, 8,9,10, 14,15,16], 3),
  makeDay("oren", "Wed", [1,2,3, 9,10, 15,16], 3),
  makeDay("oren", "Thu", [2,3,4, 10,11, 16], 3),
  makeDay("oren", "Fri", [4,5,6, 12,13], 2),
];

// Components
function Legend() {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" />
        Available
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-emerald-700" />
        Recommended
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-gray-200" />
        Unavailable
      </div>
    </div>
  );
}

function SlotGrid({ slots }) {
  const timeLabels = ["9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p"];
  
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-1 text-xs text-gray-500">
        {timeLabels.map((time, i) => (
          <div key={i} className="text-center">{time}</div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-1">
        {slots.map((s) => (
          <div
            key={s.idx}
            className={[
              "h-3 w-full rounded-sm transition-colors",
              s.available ? (s.recommended ? "bg-emerald-700" : "bg-emerald-500") : "bg-gray-200",
            ].join(" ")}
            title={`${Math.floor(s.idx / 2) + 9}:${s.idx % 2 === 0 ? '00' : '30'} - ${Math.floor((s.idx + 1) / 2) + 9}:${(s.idx + 1) % 2 === 0 ? '00' : '30'}`}
          />
        ))}
      </div>
    </div>
  );
}

function AvatarOrInitials({ person }) {
  const p = people[person];
  
  return (
    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
      {p.initials}
    </div>
  );
}

function DayRow({ day, rows, expanded, onToggle }) {
  const total = rows.reduce((sum, r) => sum + r.recommendedCount, 0);
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button onClick={onToggle} className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-2 font-medium text-gray-900">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          {day}
        </div>
        <div className="flex items-center gap-6 text-sm">
          {rows.map((r) => (
            <div key={r.person} className="flex items-center gap-2">
              <AvatarOrInitials person={r.person} />
              <span className="text-gray-600">{people[r.person].name}:</span>
              <span className="font-semibold text-gray-900">{r.recommendedCount} interviews</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Total</span>
            <span className="font-semibold text-gray-900">{total} / day</span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 px-4 py-4 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3">
              <Legend />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="h-4 w-4" /> Based on 30 min sessions + 15 min buffer
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {rows.map((r) => (
                <div key={`${day}-${r.person}`} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-3 flex items-center gap-2">
                    <AvatarOrInitials person={r.person} />
                    <div className="font-medium text-gray-900">{people[r.person].name}</div>
                    <div className="ml-auto text-sm text-gray-600">{r.recommendedCount} interviews</div>
                  </div>
                  <SlotGrid slots={r.slots} />
                  <div className="mt-2 text-xs text-gray-500">Each square is 30 minutes • 9am-6pm shown</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HybridAvailabilityPreview() {
  const [openDay, setOpenDay] = useState("Mon");

  // Partition weekly matrix by day
  const byDay = days.reduce((acc, d) => {
    acc[d] = weekly.filter((w) => w.day === d);
    return acc;
  }, {});

  const weeklyTotals = days.map((d) => byDay[d].reduce((sum, r) => sum + r.recommendedCount, 0));
  const weekTotal = weeklyTotals.reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Interview Scheduling Preview</h2>
          <p className="mt-1 text-sm text-gray-600">
            Here's how we'll schedule research interviews based on availability. Click a day to see exact time slots.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm">
          <div className="font-medium text-gray-900">Week Capacity</div>
          <div className="text-gray-600">{weekTotal} interviews</div>
        </div>
      </header>

      {/* Day rows */}
      <div className="space-y-3">
        {days.map((d) => (
          <DayRow
            key={d}
            day={d}
            rows={byDay[d]}
            expanded={openDay === d}
            onToggle={() => setOpenDay(openDay === d ? null : d)}
          />
        ))}
      </div>

      {/* Footer helper text */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 bg-gray-50">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" /> We balance interview load across researchers and days. Adjust availability to change recommendations.
        </div>
        <div>Buffer: 15min • Interview: 30min • Working hours: 9am-6pm</div>
      </div>
    </div>
  );
}