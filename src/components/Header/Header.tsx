import style from "./Header.module.css";
import { forwardRef, type ComponentProps } from "react";
import { Dropdown, DropdownButton, DropdownList } from "./Dropdown/Dropdown";

/**
 * São os Links que aparecem no meio do header ou no dropdown
 *
 * ## Tipagem:
 * ### Texto : Path (Empty = /)
 *
 */

export const AnimatedLink = forwardRef<HTMLAnchorElement, ComponentProps<"a">>(
    function AnimatedLink({ children, ...props }, ref) {
        return (
            <span className={style.Link}>
                <a ref={ref} {...props}>
                    {children}
                </a>
                <span className={style.line} />
            </span>
        );
    },
);

function Header() {
    return (
        <header className={style.header}>
            <section className={style.LogoSection}>
                <img src="/transparent49e5.png" alt="" className={style.Logo} />
                <div className={style.LogoText}>
                    <h4>Cardápio Online</h4>
                </div>
            </section>
            <span></span>
            <section className={style.right}>
                <Dropdown
                    Button={DropdownButton}
                    List={<DropdownList></DropdownList>}
                />
            </section>
        </header>
    );
}

export default Header;
