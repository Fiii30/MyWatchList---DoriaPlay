import { type ReactNode } from "react";

type ModalProps = {
    title: string,
    children: ReactNode,
    onClose: () => void,
    zIndex?: string,
}

export default function Modal(props: ModalProps){
     const zIndex = props.zIndex ?? "z-50";

    return(
        <div className={`fixed inset-0 ${zIndex} flex items-center justify-center bg-slate-950/80 p-4`} onClick={props.onClose}>
            
            <div role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                onClick={(event) => event.stopPropagation()} >

                    <div className="mb-6 flex items-center justify-between">

                        <h2 id="modal-title" className="text-xl font-bold text-white">
                            {props.title}
                        </h2>

                        <button type="button" onClick={props.onClose}
                            className="rounded-lg px-3 py-1 text-slate-400 transition font-bold text-2xl hover:bg-slate-800 hover:text-white" aria-label="Tutup modal">
                            x
                        </button>

                    </div>
                    {props.children}
            </div>
        </div>
    )
}