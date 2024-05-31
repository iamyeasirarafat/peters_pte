const ScoreTable = () => {
  const tableHeader = [
    "Section",
    "Item",
    "Contribute",
    "Contributed Scores",
    "My Correctness",
    "Target",
    "Status",
  ];
  return (
    <>
      <table className="w-full">
        <tr className="border-b-2 border-secondary">
          {tableHeader.map((item, i) => (
            <th
              key={i}
              className="text-sm text-gray font-semibold py-4 text-start capitalize"
            >
              {item}
            </th>
          ))}
        </tr>
        {/* data */}
        <tr>
          <td className="text-sm text-gray py-4  capitalize">speaking</td>
          <td className="text-sm text-gray py-4 ">RA</td>
          <td className="text-sm text-gray py-4 ">33%</td>
          <td className="text-sm text-gray py-4 ">22.9 / 31.2</td>
          <td className="text-sm text-gray py-4 ">73.4%</td>
          <td className="text-sm text-gray py-4 ">86.0%</td>
          <td className="text-sm text-gray py-4 ">
            <span className="bg-red text-white p-1 rounded-md">Bad</span>
          </td>
        </tr>
        <tr className="border-b-2 border-secondary"></tr>
        <tr>
          <td className="text-sm text-gray py-4  capitalize">Total</td>
          <td className="text-sm text-gray py-4 "></td>
          <td className="text-sm text-gray py-4 ">100%</td>
          <td className="text-sm text-gray py-4 ">67.2 / 94.5</td>
          <td className="text-sm text-gray py-4 ">73.4%</td>
        </tr>
      </table>
    </>
  );
};
export default ScoreTable;
