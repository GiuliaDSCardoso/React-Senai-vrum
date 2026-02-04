export default function Cards(props) {
    return(
        <a href={props.href} className="flex flex-col hover:cursor-pointer bg-white w-72 h-72 justify-center gap-6 rounded-lg shadow-lg p-4 items-center hover:scale-105 transition-transform">
            {props.children}
        </a>
    )
}