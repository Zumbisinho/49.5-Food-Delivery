import React, {
    useState,
    useRef,
    useEffect,
    forwardRef,
    type JSX,
} from "react";
import styles from "../Header.module.css";
import { useCart } from "../../../hooks/useCart";
import carSpr from "../../../assets/carrinho-de-compras.svg";
import ItemDropList from "./ItemDropList";
import { toast, Bounce } from "react-toastify";

type DropdownProps = {
    Button: React.ComponentType<ButtonProps>;
    List: JSX.Element;
};

export function DropdownList() {
    const cart = useCart((state) => state.cart);
    const total = useCart((state) =>
        state.cart.reduce((sum, item) => {
            const price = item.type == "combo" ? item.finalPrice : item.price;
            return sum + price * item.count;
        }, 0),
    );
    const fee = total > 200 ? 0 : 15.6;
    return (
        <ul
            className={`${styles.DropdownListLink} ${styles.GenericDropdownList}`}
        >
            <h1 className="DL-title">
                <strong>Seu pedido</strong> ({cart.length} itens)
            </h1>
            {cart.slice(0, 4).map((item, index) => {
                const toReturn =
                    item.type == "item" ? (
                        <ItemDropList
                            obj={item}
                            key={item.count}
                            type="item"
                            count={item.count}
                        />
                    ) : (
                        <ItemDropList
                            obj={item}
                            key={item.count}
                            type="combo"
                            count={item.count}
                        />
                    );

                return index <= 2 ? toReturn : <p className="DL-more">...</p>;
            })}
            <span className="DL-extra">
                <p>Subtotal</p>
                <p className="DL-subtotal">{priceToFixedString(total)}</p>
            </span>
            <span className="DL-extra">
                <p>Frete (Aproximado)</p>
                <p className={total > 200 ? "DL-free" : ""}>
                    {total > 200 ? "Gratis" : priceToFixedString(15.6)}
                </p>
            </span>
            <span className="DL-extra">
                <p className="DL-total">Total </p>
                <p className="DL-total-num">
                    {priceToFixedString(total > 0 ? total + fee : 0)}
                </p>
            </span>
            <button
                onClick={() => {
                    if (total === 0) return
                    toast.success(`Pedido enviado com sucesso! ${priceToFixedString(total > 0 ? total + fee: 0)} Descontados no PIX!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setTimeout(() => {
                        toast.error(`Pedido cancelado! Greve dos motoboys é real! (Dinheiro não descontado)`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    }, 6700);
                }}
                className="DL-finalize"
                disabled={total > 0 ? false : true}
            >
                <img src={carSpr} alt="" />
                Finalizar Pedido
            </button>
        </ul>
    );
}

function priceToFixedString(priceNum: number) {
    return `R$ ${priceNum.toFixed(2).replace(".", ",")}`;
}

type ButtonProps = React.ComponentPropsWithoutRef<"button">;
export const DropdownButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function DropdownButton({ children, ...props }, ref) {
        const total = useCart((state) =>
            state.cart.reduce((sum, item) => {
                const price =
                    item.type == "combo" ? item.finalPrice : item.price;
                return sum + price * item.count;
            }, 0),
        );
        const totalItens = useCart((state) =>
            state.cart.reduce((sum, item) => {
                return sum + item.count;
            }, 0),
        );
        return (
            <button ref={ref} className={styles.dropBtn} {...props}>
                <img src={carSpr}></img>
                <div className={styles.cartRight}>
                    <h2>Ver Carrinho</h2>
                    <p>{priceToFixedString(total)}</p>
                </div>
                <h3 className={styles.cartItemLength}>{totalItens}</h3>
            </button>
        );
    },
);

export function Dropdown({ Button, List }: DropdownProps) {
    const [listState, setListState] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    function toggleState() {
        setListState((prev) => !prev);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setListState(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    console.log(List);
    return (
        <span ref={dropdownRef}>
            <Button onClick={toggleState} />
            {listState && List}
        </span>
    );
}
