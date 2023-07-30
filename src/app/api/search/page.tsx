"use client"
import { api } from "@/utils/api"

export default function Search() {
    const searchEntries = api.entry.getAll.useQuery("hello")
    const data = searchEntries.data ?? []
    console.log('items', data)
    return (
        <>
            <h1>Search</h1>
            <table>
                <thead>
                    <tr>
                        <th>korean</th>
                        <th>english</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.korean.word}</td>
                            <td>{entry.english.word}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}