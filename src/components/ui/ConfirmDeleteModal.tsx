import Modal from "./Modal";

type CofirmDelModal = {
    title: string,
    onCancel: () => void,
    onConfirm: () => void,
}

export default function ConfirmDeleteModal(props: CofirmDelModal){
    return(

    <Modal title="Konfirmasi hapus" onClose={props.onCancel} zIndex="z-100">
        <p className="text-slate-300">
            Yakin ingin menghapus{" "}
            <span className="font-semibold text-white">{props.title}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={props.onCancel}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={props.onConfirm}
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500"
        >
          Hapus
        </button>
      </div>
    </Modal>

    )
}