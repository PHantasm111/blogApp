import { Link } from 'react-router-dom'
import Image from '../components/Image'
import PostMenuAction from '../components/PostMenuAction'
import Search from '../components/Search'
import Comments from '../components/Comments'

const SinglePostPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* details */}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written by</span>
            <Link className='text-blue-800'>John Doe</Link>
            <span>on</span>
            <Link className='text-blue-800'>Web Design</Link>
            <span>2 days ago</span>
          </div>
          <p className='text-gray-500 font-medium'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusamus, distinctio. Quasi, labore facere velit sapiente soluta,
            ratione ad corporis molestiae,
            odio voluptatibus neque incidunt ullam dicta perferendis iure modi consequatur.
          </p>
        </div>
        <div className='hidden lg:block w-2/5 '>
          <Image src="postImg.jpeg" alt="postImg" w="600" className="rounded-3xl" />
        </div>
      </div>
      {/* content */}
      <div className='flex flex-col md:flex-row gap-12'>
        {/* text */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ducimus corporis maiores incidunt ad cumque deleniti cum molestiae,
            esse veniam quidem dolorem ab quas deserunt debitis quae molestias et odio iste.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos,
            sint? Cupiditate provident nemo quam aliquid et possimus aut quis dolorem suscipit architecto.
            Sint ipsam nesciunt voluptate praesentium rerum possimus libero!
          </p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates beatae iusto doloremque ducimus illum porro vel,
            animi labore.
            Asperiores porro deserunt et alias dolorem neque dolore repudiandae sapiente maxime explicabo!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corrupti mollitia, architecto quod quaerat placeat minima impedit ex facilis eligendi,
            voluptatum beatae temporibus. Maxime enim ab quisquam omnis asperiores, quidem dolores!
            Nemo mollitia quidem doloremque repellendus voluptatum.
            Earum eligendi totam natus voluptatum magnam debitis dicta,
            quia, perspiciatis iste assumenda enim laboriosam eveniet quaerat!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corrupti mollitia, architecto quod quaerat placeat minima impedit ex facilis eligendi,
            voluptatum beatae temporibus. Maxime enim ab quisquam omnis asperiores, quidem dolores!
            Nemo mollitia quidem doloremque repellendus voluptatum.
            Earum eligendi totam natus voluptatum magnam debitis dicta,
            quia, perspiciatis iste assumenda enim laboriosam eveniet quaerat!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corrupti mollitia, architecto quod quaerat placeat minima impedit ex facilis eligendi,
            voluptatum beatae temporibus. Maxime enim ab quisquam omnis asperiores, quidem dolores!
            Nemo mollitia quidem doloremque repellendus voluptatum.
            Earum eligendi totam natus voluptatum magnam debitis dicta,
            quia, perspiciatis iste assumenda enim laboriosam eveniet quaerat!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corrupti mollitia, architecto quod quaerat placeat minima impedit ex facilis eligendi,
            voluptatum beatae temporibus. Maxime enim ab quisquam omnis asperiores, quidem dolores!
            Nemo mollitia quidem doloremque repellendus voluptatum.
            Earum eligendi totam natus voluptatum magnam debitis dicta,
            quia, perspiciatis iste assumenda enim laboriosam eveniet quaerat!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corrupti mollitia, architecto quod quaerat placeat minima impedit ex facilis eligendi,
            voluptatum beatae temporibus. Maxime enim ab quisquam omnis asperiores, quidem dolores!
            Nemo mollitia quidem doloremque repellendus voluptatum.
            Earum eligendi totam natus voluptatum magnam debitis dicta,
            quia, perspiciatis iste assumenda enim laboriosam eveniet quaerat!
          </p>
        </div>
        {/* menu */}
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-8'>
            <Image
              src="userImg.jpeg"
              alt="userImg"
              className="w-12 h-12 rounded-full object-cover"
              w="48"
              h="48"
            />
            <Link className='text-blue-800'>John Doe</Link>
          </div>
          <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          <div className='flex gap-2'>
            <Link>
              <Image src="facebook.svg" />
            </Link>
            <Link>
              <Image src="instagram.svg" />
            </Link>
          </div>
          
          </div>
          <PostMenuAction />
          <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
          <div className='flex flex-col gap-2 text-sm'>
            <Link className='underline'>All</Link>
            <Link className='underline' to="/">Web Design</Link>
            <Link className='underline' to="/">Development</Link>
            <Link className='underline' to="/">Databases</Link>
            <Link className='underline' to="/">Search Engines</Link>
            <Link className='underline' to="/">Marketing</Link>
          </div>
          <h1 className='mt-8 mb-4 text-sm font-medium'>Search</h1>
          <Search />
        </div>
      </div>
      <Comments />
    </div>
  )
}

export default SinglePostPage