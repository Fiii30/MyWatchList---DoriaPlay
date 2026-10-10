import React, { useState } from "react";
import Modal from "../../ui/Modal";
import type { Episode } from "../../type";

type EpisodeFormModalProps = {
    onClose: () => void,
    onSave: (episodeData: Omit<Episode, "id" | "seriesId">) => void,
    initialEpisode?: Episode,
}

export default function EpisodeFormModal(props: EpisodeFormModalProps){
    const [title, setTitle] = useState(props.initialEpisode?.title ?? "")
    const [platform, setPlatform] = useState(props.initialEpisode?.platform ?? "")
    const [link, setLink] = useState(props.initialEpisode?.link ?? "")
    const [watched, setWatched] = useState(props.initialEpisode?.watched ?? false)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        props.onSave({
            title: title.trim(),
            platform: platform.trim(),
            link: link.trim(),
            watched,
        })
        props.onClose()
    }

    return(

        <Modal
            title={props.initialEpisode ? "Edit episode" : "Tambah episode"}
            onClose={props.onClose}
            >
            <form onSubmit={handleSubmit} className="space-y-4">

                <label className="block text-sm text-slate-200">
                Judul episode
                <input
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Contoh: Pilot"
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                </label>

                <label className="block text-sm text-slate-200">
                Platform
                <input
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value)}
                    placeholder="Contoh: Netflix"
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                </label>

                <label className="block text-sm text-slate-200">
                Link tontonan
                <input
                    type="url"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-violet-500/60">
                    <input
                        type="checkbox"
                        checked={watched}
                        onChange={(event) => setWatched(event.target.checked)}
                        className="h-4 w-4 accent-violet-500"
                    />

                    <span>
                        <span className="block font-medium">Sudah ditonton</span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                        Tandai jika episode ini sudah kamu tonton.
                        </span>
                    </span>
                </label>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={props.onClose}
                        className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-violet-600 px-4 py-2 font-semibold text-white"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </Modal>
    )
}