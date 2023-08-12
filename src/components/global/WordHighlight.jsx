const WordHighlight = ({ words }) => {
  return (
    <p className="text-left flex flex-wrap text-xl leading-normal">
      {words?.length > 0 &&
        words.map((item, i) => {
          const colors = {
            missing: "red",
            mispronounced: "orange",
            correct: "green",
          };
          return (
            <span
              className="mr-1"
              style={{
                color: colors[item[1]],
              }}
              key={i}
            >
              {item[0]}
            </span>
          );
        })}
    </p>
  );
};
export default WordHighlight;
