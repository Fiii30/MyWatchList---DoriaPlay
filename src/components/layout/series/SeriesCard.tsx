import type { WatchItem } from "../../type";

type SeriesCardProps ={
    item: WatchItem,
    onDetail: (item: WatchItem) => void,
}

export default function SeriesCard(props: SeriesCardProps){
    const itemCover: string = "../../../../public/covers/defaultCover.png";

    return(
        <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-violet-500/60"
            role="button" tabIndex={0}
            aria-label={`Lihat detail ${props.item.title}`}
            onClick={() => props.onDetail(props.item)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                props.onDetail(props.item);
                }
            }}>
            <div className="relative aspect-2/3 overflow-hidden bg-slate-800">

                <img
                src={!props.item.cover ? itemCover : props.item.cover}
                alt={`Poster ${props.item.title}`}
                className="inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"/>

                <span className="absolute bottom-3 right-3 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white"> 
                    {props.item.status}
                </span>

                <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-semibold text-violet-300">
                    {props.item.type} - {props.item.year}
                </span>

            </div>
                
            <div className="p-4"> 
                <h3 className="truncate text-xl font-bold text-white"> 
                    {props.item.title} 
                </h3> 
                <p className="truncate mt-2 font-semibold line-clamp-3 text-sm leading-6 text-slate-400">
                    {props.item.genre.join(", ")}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400"> 
                    {props.item.description} 
                </p> 
            </div>
        </article>
    );
}