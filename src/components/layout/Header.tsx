type HeaderProps = {
    totalItems: number,
    onAddClick: () => void,
}

export default function Header(props: HeaderProps) {
    return (
        <header className="mb-10 flex flex-col gap-4 border-b border-slate-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-400">
          DoriaPlay by widora
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          MyWatchlist
        </h1>

        <p className="mt-3 max-w-xl text-slate-400">
          Catat film, serial TV, episode, dan tempat menontonnya.
        </p>
      </div>

      
      <div className="flex flex-col items-start gap-4">
        <button
          type="button"
          onClick={props.onAddClick}
          className="rounded-lg bg-green-600 px-2 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-amber-800"
        >
          Tambah tontonan
        </button>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Total tontonan
          </p>

          <p className="mt-1 text-2xl font-bold text-violet-400">
            {props.totalItems}
          </p>
        </div>
      </div>

    </header>
    )
}