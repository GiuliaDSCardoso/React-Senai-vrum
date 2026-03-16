export default function TextTitle(props) {
    return(
        <h1 className="font-asap font-black dark:text-white text-textColor text-4xl md:text-7xl ">
            {props.children}
        </h1>
    )
}