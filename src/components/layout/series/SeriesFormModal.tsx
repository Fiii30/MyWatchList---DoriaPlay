import React, { useState } from "react";
import Modal from "../../ui/Modal";
import type { ContentType, Genres, WatchItem, WatchStatus } from "../../type";

type SeriesFormModalProps = {
    idlength: WatchItem[],
    onClose: () => void,
    onSave: (newItem: WatchItem) => void,
    initialItem?: WatchItem,
}

const genreOptions: Genres[] = [
    "Action" , "Adventure" , "Superhero",
    "Comedy" , "Romance" , "Slice of life" , "Drama" , "Musical",
    "Thriller" , "Mystery" , "Horror" , "Crime" , "Psychological",
    "Fantasy" , "Sci-Fi" , "Animation" , "Supernatural",
    "Documentary" , "Historical" , "Other",
]

export default function SeriesFormModal(props: SeriesFormModalProps){
    const [title, setTitle] = useState(props.initialItem?.title ?? "")
    const [type, setType] = useState<ContentType>(props.initialItem?.type ?? "Movie")
    const [cover, setCover] = useState(props.initialItem?.cover ?? "")
    const [genres, setGenres] = useState<Genres[]>(props.initialItem?.genre ?? [])
    const [year, setYear] = useState(props.initialItem?.year ?? "")
    const [status, setStatus] = useState<WatchStatus>(props.initialItem?.status ?? "Not-Started")
    const [description, setDescription] = useState(props.initialItem?.description ?? "")
    const [imageError, setImageError] = useState("")
    const defaultCover: string = "../../../../public/covers/defaultCover.png";


    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const itemId = props.initialItem?.id ?? Date.now();

        const newItem: WatchItem = {
            id: itemId,
            title: title.trim(),
            type,
            cover,
            genre: genres,
            year: Number(year),
            status,
            description: description.trim(),
            episodes: props.initialItem?.episodes ?? [
              {
                id: Date.now() + 1,
                seriesId: itemId,
                title: type === "Movie" ? "Full Movie" : "Episode 1",
                platform: "Unknown",
                link: "",
                watched: false,
              }
            ]
        }
        props.onSave(newItem)
        props.onClose()
    }

    function handleGenreChange(selectedGenre: Genres) {
        if (genres.includes(selectedGenre)) {
            setGenres(genres.filter((item) => item !== selectedGenre));
        } else {
            setGenres([...genres, selectedGenre]);
        }
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>){
      const file = event.target.files?.[0]

      if(!file){
        return;
      }

      if(!file.type.startsWith("image/")){
        setImageError("Pilih file gambar, seperti JPG, PNG, atau WebP.");
      return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setImageError("Ukuran gambar maksimal 2 MB.");
        return;
      }

      setImageError("")

      const reader = new FileReader()
      reader.onload = () => {
        if(typeof reader.result === "string"){
          setCover(reader.result);
        }
      }
      reader.readAsDataURL(file)
    }


  return(
    <Modal title={props.initialItem ? "Edit tontonan" : "Tambah tontonan"} onClose={props.onClose} zIndex="z-80">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
            <img src={cover || defaultCover} alt="Preview poster" className="aspect-2/3 w-full object-contain"
              onError={(event) => {
                event.currentTarget.src = defaultCover;
              }}
            />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Upload Cover
            </span>

            <input type="file" accept="image/*" onChange={handleImageChange}
              className="block w-full text-xs text-slate-400 file:mr-2 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-2 file:font-medium file:text-white hover:file:bg-violet-500"
            />

            {imageError && (
              <span className="mt-2 block text-sm text-rose-400">
                {imageError}
              </span>
            )}
          </label>
        </div>

        <div className="min-w-0 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Judul
            </span>
            <input required value={title} placeholder="Contoh: Interstellar" onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"/>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Jenis tontonan
            </span>
            <select value={type} onChange={(event) => setType(event.target.value as ContentType) }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-violet-500"
            >
              <option value="Movie">Movie</option>
              <option value="TV Series">TV Series</option>
            </select>
          </label>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-200">
              Genre
              <span className="ml-2 text-xs font-normal text-slate-500">
                ({genres.length} dipilih)
              </span>
            </legend>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {genreOptions.map((option) => {
                const selected = genres.includes(option);

                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2.5 text-sm transition ${
                      selected
                        ? "border-violet-500 bg-violet-500/10 text-violet-300"
                        : "border-slate-700 bg-slate-950 text-slate-400 hover:border-violet-500/50 hover:text-white"
                    }`}
                  >
                    <input className="sr-only" type="checkbox" checked={selected}
                      onChange={() => handleGenreChange(option)}
                    />

                    <span
                      className={`flex h-18px w-18px shrink-0 items-center justify-center rounded border ${
                        selected
                          ? "border-violet-500 bg-violet-500 text-white"
                          : "border-slate-600 bg-slate-900"
                      }`}
                    >
                      {selected && (
                        <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
                          <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>

                    <span className="truncate">{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                Tahun
              </span>
              <input required type="number" min="1888" max="2100" value={year} placeholder="2024" onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                Status
              </span>
              <select value={status} onChange={(event) => setStatus(event.target.value as WatchStatus)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-violet-500"
              >
                <option value="Not-Started">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Deskripsi
            </span>
            <textarea rows={3} value={description} placeholder="Tulis deskripsi singkat..."
              onChange={(event) => setDescription(event.target.value)}
              className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
            />
          </label>

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
            <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              type="button" onClick={props.onClose}>
              Batal
            </button>

            <button type="submit" className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}