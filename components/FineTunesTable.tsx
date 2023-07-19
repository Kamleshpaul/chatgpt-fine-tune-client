import { FaEye, FaPlus, FaTrash } from "react-icons/fa";

export default function FineTunesTable({ fineTunes }: any) {
  return (
    <div className='flex px-5 mt-10 space-x-5'>
      <div className="w-full">
        <div className='flex justify-between px-3'>
          <h2 className="mb-2 text-xl font-bold">Fine-tune</h2>
        </div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Model</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {fineTunes.map((row: any) => (
              <tr key={row.id}>
                <td className="px-4 py-2 border">{row.id}</td>
                <td className="px-4 py-2 border">{row.model}</td>
                <td className="px-4 py-2 border">{row.status}</td>
                <td className="px-4 py-2 border">
                  <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    <FaEye />
                  </button>
                  <button className="px-4 py-2 ml-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
