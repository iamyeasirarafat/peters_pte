import AudioPlayer from "./audio_player/AudioPlayer";

const ListenBlock = ({ listening, setOpen, data, blank }) => {
  return (
    <div className="p-5 border border-primary rounded-[15px] relative">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center w-full gap-y-2">
          {data?.id && <AudioPlayer listening apiAudio data={data} />}
        </div>
      </div>
      {data?.id && !blank && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="text-gray text-base absolute top-2 right-2 py-2 px-3 rounded-3xl bg-secondary cursor-pointer"
        >
          Transcript
        </button>
      )}
    </div>
  );
};

export default ListenBlock;
