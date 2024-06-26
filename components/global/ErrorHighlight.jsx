const ErrorHighlight = ({ words }) => {
  return (
    <p className="text-left flex flex-wrap text-xl leading-normal">
      {words?.length > 0 &&
        words.map((item, i) => {
          const colors = {
            spelling_error: "red",
            grammar_error: "red",
            correct: "green",
          };
          return (
            <span
              className="mr-1"
              style={{
                color: colors[item.status],
              }}
              key={i}
            >
              {item.word}
            </span>
          );
        })}
    </p>
  );
};
export default ErrorHighlight;
