"use client";

import css from "./page.module.css";

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import Link from "next/link";

import { useState } from "react";

import { fetchNotes } from "@/lib/api";

import { type Note } from "@/types/note";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

interface Props {
  tag: undefined | string
};

export default function NotesClient({ tag }: Props) {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", query, page, tag],
        queryFn: () => fetchNotes(query, page, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false
    });

    const notes: Note[] = data?.notes ?? [];
    const totalPages: number = data?.totalPages ?? 0;

    const handleChange = (value: string): void => {
        setQuery(value);
        setPage(1);
    };

    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
            <SearchBox
              searchTextValue={query}
              onChange={handleChange}
            />
            {
              totalPages > 1 &&
                <Pagination
                  onPageChange={setPage}
                  currentPage={page}
                  totalNumberPages={totalPages}
                />
            }
            <Link
              className={css.button}
              href={"/notes/action/create"}
            >
              Create note +
            </Link>
          </header>
          {
            notes.length === 0 && !isLoading && !isError &&
            <p>Sorry, but there&apos;s no results on this query.</p>
          }
          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong...</p>}
          {
            notes.length !== 0 &&
              <NoteList
                notes={notes}
              />
          }
        </div>
    );
}