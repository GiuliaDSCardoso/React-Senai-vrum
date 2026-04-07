export default function TextTitle(props) {
    return(
        <h1 className="font-asap font-bold  dark:text-white text-black/70 text-2xl md:text-3xl ">
            {props.children}
        </h1>
    )
}