import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return(
        <div className='absolute z-10 px-16 navbar justify-between flex w-full'> 
          <div className="navbar__logo flex">
            <Image src="/logo4.svg" alt="Logo" width={180} height={90} />
          </div>
          <ul className="navbar__nav flex text-center items-center font-bold text-xl">
            <li className='px-8'><Link href="/">Home</Link> </li>
            <li className='px-8'><Link href="/">About</Link> </li>
            <li className='px-8'><Link href={'/StarterImage'}>Projects</Link></li>
            <li className='px-8'><Link href={'/'}>Contact</Link></li>
          </ul>
          <Image src="/hamburger.svg" alt="hamburger" width={42} height={42}/>
        </div>
    )
}
export default Navbar