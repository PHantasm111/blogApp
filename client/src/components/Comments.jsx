import Comment from "./Comment"

const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
        <h1 className="text-xl text-gray-500 underline">Comments</h1>
        <div className="flex items-center justify-between gap-8 w-full">
            <textarea placeholder="Write a comment..." className="w-full bg-gray-100 rounded-xl p-4"></textarea>
            <button className="bg-blue-800 text-white rounded-xl px-4 py-3 font-medium">Send</button>
        </div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
    </div>
  )
}

export default Comments