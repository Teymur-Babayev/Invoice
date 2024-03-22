import { FileCheck } from "lucide-react";
import React, { useState } from "react";
import { SelectedEstFin } from "./SelectedEstFin";

export const UpdateEstadoForm = ({ cliente, data }) => {
  const [SelectedData, setSelectedData] = useState(null);

  const filteredEstFinClient =
    data?.filter((client) =>
      client.username.toLowerCase().includes(cliente.toLowerCase())
    ) || [];

  return (
    <div>
      <div className="w-full space-y-3">
        <h2 className="text-2xl text-white font-bold">Cliente: {cliente}</h2>

        <div className="w-full overflow-auto">
          <div className="w-fit flex gap-3 overflow-auto">
            {filteredEstFinClient.map((data, index) => (
              <div
                key={index}
                onClick={() => setSelectedData(data)}
                className="bg-white cursor-pointer flex flex-col items-center justify-center rounded-md w-28 h-28"
              >
                <FileCheck size={40} />
                <span>{data.month}</span>
                <span>{data.year}</span>
              </div>
            ))}
          </div>
        </div>
        {SelectedData && <SelectedEstFin data={SelectedData}/>}
      </div>
    </div>
  );
};
