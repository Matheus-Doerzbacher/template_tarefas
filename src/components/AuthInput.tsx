interface AuthInputProps {
    label: string;
    valor: any;
    naoRenderizarQuando?: boolean;
    tipo?: "text" | "email" | "password";
    valorMudou: (novoValor: any) => void;
    fazerLogin: () => void
}

export default function AuthInput(props: AuthInputProps) {
    return props.naoRenderizarQuando ? null : (
        <div className=" flex flex-col mt-4">
            <label>{props.label}</label>
            <input
                type={props.tipo ?? "text"}
                value={props.valor}
                onChange={(e) => props.valorMudou?.(e.target.value)}
                required
                className={`
                    px-4 py-3 rounded-lg mt-2 bg-gray-200
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none
                `}
                onKeyUp={(e) => {
                    if (e.code === "Enter" || e.code === "NumpadEnter") {
                        props.fazerLogin();
                    }
                }}
            />
        </div>
    );
}
