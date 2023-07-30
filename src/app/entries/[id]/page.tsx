"use client";
import { api } from "@/utils/api";
import { SpeakerHigh } from "@phosphor-icons/react";
import { entry } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

export default function Entry({ params: { id } }: Props) {
  const findEntry = api.entry.get.useQuery<entry>(id);
  const entry = findEntry.data;

  return (
    <>
      <div className="m-10 flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-5xl">{entry?.english?.word}</h1>
          <h1 className="text-5xl">{entry?.korean?.word}</h1>
          <SpeakerHigh size={32} />
        </div>
        <p>{entry?.english?.definition}</p>
        <div className="flex flex-row gap-4">
          <h2 className="text-2xl">Examples</h2>
        </div>
          {entry?.korean?.examples?.map((example, idx) => (
            <div key={idx} className="flex flex-col gap-4 bg-slate-200 rounded-sm p-2">
              <p>{example?.value}</p>
            </div>
          ))}
      </div>
    </>
  );
}
