export default function TextTitle(props) {
    return(
        <h1 className="font-asap font-black text-3xl md:text-7xl text-[#0E4194]">
            {props.children}
        </h1>
    )
}