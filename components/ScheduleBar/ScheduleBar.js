import Link from 'next/link';
import ChevronRight from '../ChevronRight/ChevronRight';

export default function ScheduleBar(props) {
  const wrapperClasses = [
    'w-full',
    'lg:w-1/2',
    'left-1/2',
    '-translate-x-1/2',
    'mx-auto',
    'text-center',
    'fixed',
    'bottom-0',
    'bg-white',
    'hover:bg-slate-100',
    'border-t-2',
    'border-x-2',
    'shadow-md',
    'transition-all',
    'duration-300',
    'font-bold',
    'text-lg',
  ];

  if (props.trackedShows === null || !props.trackedShows.length) {
    wrapperClasses.push('translate-y-full');
  }

  return (
    <div className={wrapperClasses.reduce((prev, current) => `${prev} ${current}`)}>
      <Link href="/subscription-url">
        <a className="block py-5 px-2">
          Tracked Shows
          <span className="py-1 px-3 ml-2 font-bold bg-red-700 text-white rounded-full">{props?.trackedShows?.length || '0'}</span>
          <ChevronRight />
        </a>
      </Link>
    </div>
  );
}
