export default function ScheduleBar(props) {
  const wrapperClasses = [
    'w-full',
    'lg:w-1/2',
    'left-1/2',
    '-translate-x-1/2',
    'mx-auto',
    'text-center',
    'py-5',
    'fixed',
    'bottom-0',
    'bg-white ',
    'border-t-2 ',
    'border-x-2 ',
    'shadow-md ',
    'transition-all',
    'duration-300',
  ];

  if (props.trackedShows === null || !props.trackedShows.length) {
    wrapperClasses.push('translate-y-full');
  }

  return <div className={wrapperClasses.reduce((prev, current) => `${prev} ${current}`)}>Tracked Shows <span className="py-1 px-3 font-bold bg-red-700 text-white rounded-full">{props?.trackedShows?.length || '0'}</span></div>;
}
