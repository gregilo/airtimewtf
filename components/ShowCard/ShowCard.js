import TrackButton from '../TrackButton/TrackButton';

export default function ShowCard(props) {
  const imageSrc = props.result.show?.image?.medium ?? `https://via.placeholder.com/210x295.png?text=${encodeURIComponent(props.result.show.name)}`;
  const bgImageStyles = {backgroundImage: `url("${imageSrc}")`};
  let isTracked = false;
  if (props.trackedShows && props.trackedShows.indexOf(props.result.show.id) > -1) {
    isTracked = true;
  }

  return (
    <li key={props.showNum} className="flex flex-col rounded-md overflow-hidden shadow-md hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 hover:shadow-lg">
      <div className="relative w-full" style={{paddingBottom: '140.4761905%'}}>
        <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover" style={bgImageStyles}></div>
      </div>
      <div className="p-4 flex flex-col grow w-full">
        <div className="flex flex-col grow">
          <h3 className="font-serif text-xl">{props.result.show.name}</h3>
          <p className="text-sm">{props.result.show?.network?.name && props.result.show.network.name}</p>
          {props.result.show?.genres &&
            <div className="flex flex-row flex-wrap gap-x-1 gap-y-2 -ml-1 my-2">
              {props.result.show.genres.map((genre, key) => <span key={key} className="lowercase inline-block text-xs py-1 px-1 bg-slate-200 rounded">{genre}</span>)}
            </div>}
        </div>
        <div className="mt-3 justify-self-end">
          <TrackButton isTracked={isTracked} addTrackedShow={props.addTrackedShow} removeTrackedShow={props.removeTrackedShow} showId={props.result.show.id} />
        </div>
      </div>
    </li>
  );
}
