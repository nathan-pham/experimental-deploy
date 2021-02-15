import Link from "next/link"

const Error = () => {
    return (
        <div className="flex align-center justify-center direction-column error fade-in">
            <h1>¯\_(ツ)_/¯</h1>
            <p>project not found</p>
            <div className="flex align-center">
                <Link href="/">
                    <a className="flex align-center justify-center">
                        <i className="fas fa-angle-left"></i>
                    </a>
                </Link>
                go back
            </div>
        </div>
    )
}

export default Error