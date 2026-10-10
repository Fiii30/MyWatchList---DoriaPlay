import type { WatchItem } from "../../type";
import SeriesCard from "./SeriesCard";

type SeriesListProps = {
    items: WatchItem[],
    onDelete: (item: WatchItem) => void,
    onEdit: (item: WatchItem) => void,
    onDetail: (item: WatchItem) => void,
    
} 

export default function SeriesList(props: SeriesListProps){
    return(
        <section>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
                        Koleksi
                    </p>

                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {props.items.map((item) => (
                    <SeriesCard key={item.id} item={item} 
                    onDetail={props.onDetail}/>
                ))}
            </div>
        </section>
    )
}