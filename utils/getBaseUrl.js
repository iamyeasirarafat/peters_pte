// let url;
//     if (questionTable === "read-aloud") {
//       url = "practice/read_alouds";
//     } else if (questionTable === "summarize") {
//       url = "summarizes";
//     } else if (questionTable === "write-easy") {
//       url = "write_easies";
//     } else if (questionTable === "highlight-summary") {
//       url = "highlight_summarys";
//     } else if (questionTable === "missing-word") {
//       url = "missing_words";
//     } else if (questionTable === "dictation") {
//       url = "dictations";
//     } else if (questionTable === "repeat-sentence") {
//       url = "repeat_sentences";
//     } else if (questionTable === "short-question") {
//       url = "short_questions";
//     } else if (questionTable === "retell-sentence") {
//       url = "retell_sentences";
//     } else if (questionTable === "describe-image") {
//       url = "describe_images";
//     } else if (questionTable === "reorder-paragraph") {
//       url = "reorder_paragraphs";
//     } else if (questionTable === "multi-choice-reading") {
//       url = "multi_choices/reading";
//     } else if (questionTable === "multi-choice-reading-single") {
//       url = "multi_choices/reading/single-answer";
//     } else if (questionTable === "multi-choice") {
//       url = "multi_choices";
//     } else if (questionTable === "multi-choice-single") {
//       url = "multi_choices/single-answer";
//     } else if (questionTable === "summarize-spoken") {
//       url = "spoken/summarizes";
//     } else if (questionTable === "r-w-blank") {
//       url = "read-write/blanks";
//     } else if (questionTable === "spelling-bee") {
//       url = "games/spelling_bees";
//     } else if (questionTable === "blank") {
//       url = "blanks";
//     } else if (questionTable === "reading-blank") {
//       url = "reading_blanks";
//     } else if (questionTable == "highlight-incorrect-words") {
//       url = "highlight_incorrect_words";
//     } else if (questionTable === "spelling-bee") {
//       url = "games/spelling_bees";
//     } else if (questionTable === "speaking-spell") {
//       url = "games/speaking_spells";
//     } else if (questionTable === "listening-frenzy") {
//       url = "games/listening_frenzies";
//     }

const getBaseUrl = (questionTable) => {
  let url;
  if (questionTable === "read-aloud") {
    url = "practice/read_alouds";
  } else if (questionTable === "summarize") {
    url = "summarizes";
  } else if (questionTable === "write-easy") {
    url = "write_easies";
  } else if (questionTable === "highlight-summary") {
    url = "highlight_summarys";
  } else if (questionTable === "missing-word") {
    url = "missing_words";
  } else if (questionTable === "dictation") {
    url = "dictations";
  } else if (questionTable === "repeat-sentence") {
    url = "repeat_sentences";
  } else if (questionTable === "short-question") {
    url = "short_questions";
  } else if (questionTable === "retell-sentence") {
    url = "retell_sentences";
  } else if (questionTable === "describe-image") {
    url = "describe_images";
  } else if (questionTable === "reorder-paragraph") {
    url = "reorder_paragraphs";
  } else if (questionTable === "multi-choice-reading") {
    url = "multi_choices/reading";
  } else if (questionTable === "multi-choice-reading-single") {
    url = "multi_choices/reading/single-answer";
  } else if (questionTable === "multi-choice") {
    url = "multi_choices";
  } else if (questionTable === "multi-choice-single") {
    url = "multi_choices/single-answer";
  } else if (questionTable === "summarize-spoken") {
    url = "spoken/summarizes";
  } else if (questionTable === "r-w-blank") {
    url = "read-write/blanks";
  } else if (questionTable === "spelling-bee") {
    url = "games/spelling_bees";
  } else if (questionTable === "blank") {
    url = "blanks";
  } else if (questionTable === "reading-blank") {
    url = "reading_blanks";
  } else if (questionTable == "highlight-incorrect-words") {
    url = "highlight_incorrect_words";
  } else if (questionTable === "spelling-bee") {
    url = "games/spelling_bees";
  }
  return url;
};

export default getBaseUrl;
