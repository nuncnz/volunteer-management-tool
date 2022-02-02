import {AppURL} from "../models/AppURL";
import Link from "next/link";

const NavLink = (currentPath: string, url: AppURL, linkText: string) => {

    return (
        <li><Link passHref={true} href={url}><a id={currentPath.includes(url) ? "active-page" : undefined}>{linkText}</a></Link></li>
    )

}

export default NavLink