export default function Cards(props) {
    return (
      <a
        href={props.href}
        className="flex flex-col text-center hover:cursor-pointer bg-white md:w-64 md:h-64 w-48 h-48 md:text-2xl text-lg justify-center gap-2 md:gap-6 rounded-lg shadow-lg p-4 items-center hover:scale-105 transition-transform"
      >
        {props.item}
        <h3 className="text-lg md:text-2xl text-[#0055dd71] font-bold">
          {props.texto}
        </h3>
      </a>
    );
  }
  