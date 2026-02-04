export default function ALink(props) {
    return( 
          <a className="flex  justify-center px-4 w-full gap-2 pt-2 pb-2 items-center hover:bg-blue-100 text-xl font-bold font-inter" href={props.href}>{props.children}</a>     
)
}