"use client";
import { useDebounce } from "@/hooks/debounce";
import { api } from "@/utils/api";
import { Combobox, Transition } from "@headlessui/react";
import { Check, MagnifyingGlass } from "@phosphor-icons/react";
import { entry } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const findEntries = api.entry.getAll.useQuery(debouncedQuery);
  const filteredEntries = findEntries.data ?? [];

  return (
    <>
      <Head>
        <title>Han Blocks</title>
        <meta name="description" content="Han Blocks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold">Welcome to Han Blocks</h1>
          <p>Find out what that word in Korean is. Fast.</p>
          <Combobox>
            <div className="relative mt-1">
              <div className="relative w-96 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(entry: entry) => entry?.english?.word ?? ""}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="What do you want to learn?"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <MagnifyingGlass
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredEntries.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredEntries.map((entry: any, i) => (
                      <Combobox.Option
                        key={i}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={entry}
                      >
                        {({ selected, active }) => (
                          <Link href={`/entries/${entry._id?.$oid}`}>
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {entry.english.word}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  >
                                    <Check
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                          </Link>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </main>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
