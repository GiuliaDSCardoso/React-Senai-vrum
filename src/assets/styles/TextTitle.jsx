export default function TextTitle(props) {
    return(
        <h1 className="font-asap font-bold  dark:text-white text-[#161C24] text-md md:text-xl ">
            {props.children}
        </h1>
    )
}