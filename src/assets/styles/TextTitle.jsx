export default function TextTitle(props) {
    return(
        <h1 className="font-asap font-black dark:text-white text-textColor text-3xl md:text-5xl ">
            {props.children}
        </h1>
    )
}