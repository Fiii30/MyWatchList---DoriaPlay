import Modal from "../../ui/Modal";
import type { Episode, WatchItem } from "../../type";

type SeriesDetailModalProps = {
    item: WatchItem,
    onClose: () => void,
    onEditSeries: (item: WatchItem) => void;
    onDeleteSeries: (item: WatchItem) => void;
    onAddEpisode: () => void;
    onEditEpisode: (episode: Episode) => void;
    onDeleteEpisode: (episode: Episode) => void;
    onToggleWatched: (episode: Episode) => void;
}

export default function SeriesDetailModal(props: SeriesDetailModalProps){
    const episodes = props.item.episodes ?? [];

    return(
        <Modal title={props.item.title} onClose={props.onClose}>

            <div className="grid gap-5 sm:grid-cols-[160px_minmax(0,1fr)]">
            
            <img
                src={props.item.cover} alt={`Poster ${props.item.title}`}
                className="h-56 w-full rounded-xl border border-slate-700 object-cover sm:h-60" />

            <div className="flex min-w-0 flex-col">
                <p className="text-sm text-violet-400">
                    {props.item.type} <span>• </span>
                    {props.item.year}
                </p>


            <p className="mt-3 text-sm text-slate-300">
                <span className="text-slate-500">Genre:</span>{" "}
                {props.item.genre?.join(", ")}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
            {props.item.description || "Belum ada deskripsi."}
            </p>

            {/* Tombol aksi */}
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <button
                type="button"
                onClick={() => props.onEditSeries(props.item)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300"
            >
                Edit
            </button>

            <button
                type="button"
                onClick={() => props.onDeleteSeries(props.item)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-300"
            >
                Hapus
            </button>
            </div>


            </div>
            </div>

            <section className="mt-8 border-t border-slate-800 pt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                <h3 className="font-semibold text-white">Episode</h3>
                <p className="mt-1 text-xs text-slate-500">
                    {episodes.length} episode
                </p>
                </div>


            <button
            type="button"
            onClick={props.onAddEpisode}
            className="shrink-0 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
            >
            + Tambah
            </button>


            </div>

            <div className="custom-scrollbar max-h-72 space-y-3 overflow-y-auto pr-2">
                {episodes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center">
                    <p className="text-sm text-slate-400">Belum ada episode</p>
                    <p className="mt-1 text-xs text-slate-500">
                    Tambahkan episode untuk mulai mengatur tontonan.
                    </p>
                </div>
                ) : (
                episodes.map((episode) => (
                    <article
                    key={episode.id}
                    className={`rounded-xl border p-4 transition ${ episode.watched ? "border-emerald-500/30 bg-emerald-500/10" : "border-slate-800 bg-slate-900/60 hover:border-slate-500" }`}
                    >
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                        <h4 className="wrap-break-words text-sm font-medium text-white">
                            {episode.title}  
                        </h4>


                    {episode.platform && (
                        <p className="mt-1 text-xs text-slate-500">
                        {episode.platform}
                        </p>
                    )}
                    </div>

                    <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[11px] ${
                        episode.watched
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                    >
                    {episode.watched ? "Selesai" : "Belum ditonton"}
                    </span>
                </div>

                {episode.link && (
                    <a
                    href={episode.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs text-violet-400 transition hover:text-violet-300"
                    >
                    Buka tontonan ↗
                    </a>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-3">
                    <button
                    type="button"
                    onClick={() => props.onToggleWatched(episode)}
                    className="rounded-md bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300 transition hover:bg-violet-500/20"
                    >
                    {episode.watched ? "Batalkan selesai" : "Tandai selesai"}
                    </button>

                    <button
                    type="button"
                    onClick={() => props.onEditEpisode(episode)}
                    className="rounded-md px-3 py-1.5 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-amber-300"
                    >
                    Edit
                    </button>

                    <button
                    type="button"
                    onClick={() => props.onDeleteEpisode(episode)}
                    className="rounded-md px-3 py-1.5 text-xs text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
                    >
                    Hapus
                    </button>
                </div>
                </article>
            ))
            )}


            </div>
            </section>

        </Modal>
    )
}