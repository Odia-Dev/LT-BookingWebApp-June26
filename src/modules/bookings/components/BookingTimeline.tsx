import React from 'react';
import { BookingTimelineEvent } from '../types';
import { ClipboardList } from 'lucide-react';

interface BookingTimelineProps {
  timeline: BookingTimelineEvent[];
  className?: string;
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({ timeline, className = '' }) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
        <ClipboardList className="h-4 w-4 text-gray-400" /> Transaction Audit logs
      </h4>

      <div className="border-l-2 border-gray-150 pl-5 ml-2.5 space-y-4 text-xs relative">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#EB0A1E]" />
            <div className="flex justify-between items-center font-bold text-gray-850 gap-4 flex-wrap sm:flex-nowrap">
              <span>{event.action.replace(/_/g, ' ')}</span>
              <span className="text-[9px] font-normal text-gray-400 shrink-0">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">Operated by: {event.operator}</p>
            {event.notes && (
              <p className="text-[10px] text-gray-650 bg-gray-50 p-2 border border-gray-150 rounded-lg mt-1 italic leading-relaxed">
                "{event.notes}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
