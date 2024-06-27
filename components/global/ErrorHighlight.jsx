// const ErrorHighlight = ({ words }) => {
//   return (
//     <p className="text-left flex flex-wrap text-xl leading-normal">
//       {words?.length > 0 &&
//         words.map((item, i) => {
//           const colors = {
//             spelling_error: "red",
//             grammar_error: "red",
//             correct: "green",
//           };
//           return (
//             <>
//               <span
//                 className={`${(item.status === "spelling_error" || item.status === "grammar_error") && "underline cursor-pointer"}  mr-1`}
//                 style={{
//                   color: colors[item.status],
//                 }}
//                 key={i}
//               >
//                 {item.word}
//               </span>
//             </>
//           );
//         })}
//     </p>
//   );
// };
// export default ErrorHighlight;


// components/Popover.js
import React, { useState } from 'react';

const ErrorHighlight = ({ words }) => {
  const [popover, setPopover] = useState({ isVisible: false, content: '', position: { top: 0, left: 0 } });

  const handleMouseEnter = (event, content) => {
    const rect = event.target.getBoundingClientRect();
    setPopover({
      isVisible: true,
      content,
      position: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      },
    });
  };

  const handleMouseLeave = () => {
    setPopover({ isVisible: false, content: '', position: { top: 0, left: 0 } });
  };

  const colors = {
    spelling_error: 'text-red-500',
    grammar_error: 'text-red-500',
    correct: 'text-green-500',
  };

  return (
    <div className="">
      <p className="text-left flex flex-wrap text-xl leading-normal">
        {words?.length > 0 &&
          words.map((item, i) => (
            <span
              className={`${(item.status === 'spelling_error' || item.status === 'grammar_error') && 'underline cursor-pointer'} ${colors[item.status]} mr-1`}
              key={i}
              {...(item.status === 'spelling_error' || item.status === 'grammar_error') &&
              {
                onMouseEnter: (e) => handleMouseEnter(e, item),
                onMouseLeave: handleMouseLeave,
              }
              }
            >
              {item.word}
            </span>
          ))}
      </p>
      <Popover isVisible={popover.isVisible} position={popover.position} content={popover.content} />

    </div>
  );
};

export default ErrorHighlight;


const Popover = ({ content, isVisible, position }) => {
  if (!isVisible) return null;
  console.log(content);
  return (
    <div
      style={{
        top: position.top - 130,
        left: position.left - 100,
      }}
      className="absolute w-64 text-sm text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-1">
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
        <h3 className="capitalize font-semibold text-gray-900 dark:text-white">
          {content?.status.replace("_", " ")}
        </h3>
      </div>
      <p className='text-left px-2'>Possible {content?.status.replace("_", " ")} found</p>
      <div className="py-2 text-left px-2">
        <p>
          <span className='font-bold'>Suggestion</span> : {content?.replacement}
        </p>
      </div>
    </div>
  );
};
