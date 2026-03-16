export default function ALink(props) {
    return( 
          <a className="flex  justify-center w-[100%] dark:hover:bg-[#04012e67] hover:bg-[#a0b2ff]/20 rounded-md pt-2 pb-2 items-center hover:text-[#4f92ff] gap-2 text-md md:text-xl font-bold font-inter" href={props.href}>{props.children}</a>     
)
}