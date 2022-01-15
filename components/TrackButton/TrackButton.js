export default function TrackButton(props) {
  let buttonText = 'Track';
  let buttonColorClasses = 'bg-lime-700 hover:bg-lime-800 focus:bg-lime-800 active:bg-lime-700';

  if (props.isTracked) {
    buttonText = 'Remove';
    buttonColorClasses = 'bg-red-700 hover:bg-red-800 focus:bg-red-800 active:bg-red-700';
  }

  const buttonClasses = `${buttonColorClasses} transition-color duration-150 text-white text-sm font-bold py-1 px-3 rounded`;

  return <button onClick={(e) => props.isTracked ? props.removeTrackedShow(props.showId, e) : props.addTrackedShow(props.showId, e)} className={buttonClasses}>{buttonText}</button>;
}
