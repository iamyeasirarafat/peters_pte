export default function Highlight_incorrect_words() {
  return (
    <div className="">
      {/* header */}
      <div>
        <p className="font-semibold">
          You will hear a recording. Below is a transcription of the recording.
          Some words in the transcription are incorrect. Choose the words that
          are incorrect.
        </p>

        <div className="flex flex-col">
          <div>
            {/* audio player  */}
            <div className="py-4 w-full">
              <audio controls className="w-full">
                <source src="horse.ogg" type="audio/ogg" />
                <source src="horse.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          {/* ttranscription box */}
          <div className="border border-gray/30 p-2">
            <span className="bg-yellow-200 py-0.5 px-1 border border-gray/20">
              Charlemagne
            </span>{" "}
            was a great king of the Franks. He was crowned Emperor of the Romans
            in 800. He was a great warrior and{" "}
            <span className="bg-yellow-200 py-0.5 px-1 border border-gray/20">
              expanded
            </span>
            his empire through conquest. He was a descendent of Frankish kings.
            <span className="bg-yellow-200 py-0.5 px-1 border border-gray/20">
              Charlemagne
            </span>{" "}
            was a great king of the Franks. He was crowned Emperor of the Romans
            in 800. He was a great warrior and{" "}
            <span className="bg-yellow-200 py-0.5 px-1 border border-gray/20">
              expanded
            </span>
            his empire through conquest. He was a descendent of Frankish kings.
          </div>
        </div>
      </div>
    </div>
  );
}
