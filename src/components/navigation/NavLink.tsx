import {AppURL} from "../../models/app/AppURL";
import Link from "next/link";

const NavLink = (currentPath: string, url: AppURL, linkText: string) => {

    return (
        <li key={linkText}><Link passHref={true} href={url}><a id={currentPath.includes(url) ? "active-page" : undefined}>{linkText}</a></Link></li>
    )

}

export default NavLink