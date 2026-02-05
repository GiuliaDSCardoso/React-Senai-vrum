export default function ALink(props) {
    return( 
          <a className="flex  justify-center w-[100%]  pt-2 pb-2 items-center hover:text-[#4f92ff] gap-2 text-md md:text-xl font-bold font-inter" href={props.href}>{props.children}</a>     
)
}