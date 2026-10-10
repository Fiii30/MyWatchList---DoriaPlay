import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import ConfirmDeleteModal from "./components/ui/ConfirmDeleteModal";
import SeriesDetailModal from "./components/layout/series/SeriesDetailModal";
import SeriesList from "./components/layout/series/SeriesList";
import SeriesFormModal from "./components/layout/series/SeriesFormModal";
import EpisodeFormModal from "./components/layout/episodes/EpisodesFormModal";
import { initialData } from "./components/data/initialData";
import type { Episode, WatchItem } from "./components/type";


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemDelete, setItemDelete] = useState<WatchItem | null>(null)
  const [itemEdit, setItemEdit] = useState<WatchItem | null>(null)
  const [itemViewId, setItemViewId] = useState<number | null>(null)
  const [episodeEdit, setEpisodeEdit ] = useState<Episode | null>(null)
  const [isEpisodeForm, setIsEpisodeForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  const STORAGE_KEY = "mystorage"

  function loadWatchItems(): WatchItem[]{
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY)

      if(savedItems){
        return JSON.parse(savedItems) as WatchItem[];
      }

    } catch(error) {
      console.error("Gagal membaca data dari LocalStorage: ", error)
    }
    return initialData;
  }

  const [watchItem, setWatchItem] = useState<WatchItem[]>(loadWatchItems)
  const totalItems = watchItem.length
  const itemView = watchItem.find((item) => item.id === itemViewId) ?? null;
  const filteredItems = watchItem.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())
);
  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchItem));
    } catch (error) {
      console.error("Gagal menyimpan data ke localStorage:", error);
    }
  }, [watchItem]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl rounded-lg bg-slate-900 p-6 shadow-lg">
        
        <Header totalItems={totalItems} onAddClick={() => {setItemEdit(null), setIsModalOpen(true)}}/>

        <div className="mb-6">
          <label htmlFor="watch-search" className="mb-2 block text-sm font-medium text-slate-300">
            Cari judul tontonan
          </label>

          <input id="watch-search" type="search" placeholder="Contoh: Minions" value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <SeriesList items={filteredItems} 
          onDelete={handleAskDel}  
          onEdit={handleAskEdit} 
          onDetail={handleShowDetail} />

        {itemDelete !== null && (
          <ConfirmDeleteModal
            title={itemDelete.title}
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}

        {(isModalOpen || itemEdit !== null) && (
          <SeriesFormModal 
            onClose={() => {setIsModalOpen(false), setItemEdit(null)}} 
            onSave={handleSaveItem}
            initialItem={itemEdit ?? undefined}  
            idlength={watchItem} />
        )}

        {itemView !== null && (
          <SeriesDetailModal
            item={itemView}
            onClose={() => setItemViewId(null)}
            onEditSeries={handleAskEdit}
            onDeleteSeries={handleAskDel}
            onAddEpisode={() => handleAddEpisode()}
            onEditEpisode={handleEditEpisode}
            onDeleteEpisode={handleDeleteEpisode}
            onToggleWatched={handleToggleWatched}
          />
        )}

        {isEpisodeForm && itemView !== null && (
          <EpisodeFormModal
            initialEpisode={episodeEdit ?? undefined}
            onClose={() => {
              setIsEpisodeForm(false);
              setEpisodeEdit(null);
            }}
            onSave={handleSaveEpisode}
          />
        )}

      </section>
    </main>
  )
  
  function handleShowDetail(item: WatchItem) {
    setItemViewId(item.id);
  }

  function handleAskDel(item: WatchItem){
    setItemDelete(item)
  }

  function handleConfirmDelete(){
    if(itemDelete === null){
      return;
    }

    setWatchItem((currentItems) => 
      currentItems.filter((items) => items.id !== itemDelete.id)
    )

    setItemDelete(null)
  }

  function handleCancelDelete() {
    setItemDelete(null);
  }

  function handleAskEdit(item: WatchItem) {
    setItemEdit(item);
  }

  function handleSaveItem(savedItem: WatchItem) {
    setWatchItem((currentItems) => {
      const itemAlreadyExists = currentItems.some(
        (item) => item.id === savedItem.id
      );

      if (itemAlreadyExists) {
        return currentItems.map((item) =>
          item.id === savedItem.id ? savedItem : item
        );
      }
      return [...currentItems, savedItem];
    });
    setItemEdit(null);
    setIsModalOpen(false);
  }

  function handleAddEpisode() {
    setEpisodeEdit(null);
    setIsEpisodeForm(true);
  }

  function handleSaveEpisode(data: Omit<Episode, "id" | "seriesId">) {
    console.count("App handleSaveEpisode");
    if (!itemView) return;
    
    setWatchItem((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemView.id) return item;

        const episodes = item.episodes ?? [];

        if (episodeEdit) {
          return {
            ...item,
            episodes: episodes.map((episode) =>
              episode.id === episodeEdit.id
                ? { ...episodeEdit, ...data }
                : episode
            ),
          };
        }

        const newEpisode: Episode = {
          ...data,
          id: Date.now(),
          seriesId: itemView.id,
        };

        return {
          ...item,
          episodes: [...episodes, newEpisode],
        };
      })
    );

    setEpisodeEdit(null);
    setIsEpisodeForm(false);
  }

  function handleEditEpisode(episode: Episode) {
    setEpisodeEdit(episode);
    setIsEpisodeForm(true);
  }

  function handleDeleteEpisode(episode: Episode) {
    if (!itemView) return;

    setWatchItem((currentItems) =>
      currentItems.map((item) =>
        item.id === itemView.id
          ? {
              ...item,
              episodes: item.episodes.filter(
                (currentEpisode) => currentEpisode.id !== episode.id
              ),
            }
          : item
      )
    );
  }

  function handleToggleWatched(episode: Episode) {
    if (!itemView) return;

    setWatchItem((currentItems) =>
      currentItems.map((item) =>
        item.id === itemView.id
          ? {
              ...item,
              episodes: item.episodes.map((currentEpisode) =>
                currentEpisode.id === episode.id
                  ? { ...currentEpisode, watched: !currentEpisode.watched }
                  : currentEpisode
              ),
            }
          : item
      )
    );
  }

}

