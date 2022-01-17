export default function TrackButton(props) {
  let buttonText = 'Track';
  let buttonColorClasses = 'bg-lime-700 text-white border border-lime-800 hover:bg-lime-900 focus:bg-lime-800 active:bg-lime-700';

  if (props.isTracked) {
    buttonText = 'Remove';
    buttonColorClasses = 'bg-red-700 text-white border border-red-700 hover:bg-white focus:bg-white active:bg-white hover:text-red-700 focus:text-red-700 active:text-red-700';
  }

  const buttonIconBeforeClasses = `before:transition-all before:duration-300 before:absolute before:top-3.5 before:left-2.5 before:content-[''] before:bg-white before:w-4 before:h-1 before:block ${props.isTracked ? 'before:rotate-180 before:hover:bg-red-700 before:focus:bg-red-700 before:active:bg-red-700' : ''}`;
  const buttonIconAfterClasses = `after:transition-all after:duration-300 after:absolute after:top-2 after:left-4 after:content-[''] after:bg-white after:w-1 after:h-4 after:block ${props.isTracked ? 'after:opacity-0 after:rotate-90' : ''}`;
  const buttonClasses = `${buttonColorClasses} ${buttonIconBeforeClasses} ${buttonIconAfterClasses} relative transition-all duration-300 text-white text-md font-bold py-1 pl-8 pr-3 rounded`;

  return (
  <button onClick={(e) => props.isTracked ? props.removeTrackedShow(props.showId, e) : props.addTrackedShow(props.showId, e)} className={buttonClasses}>
    {buttonText}
  </button>
  );
}
