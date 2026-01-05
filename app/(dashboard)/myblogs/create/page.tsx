import Tiptap from "./TipTapEditor";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl  mb-4 font-semibold">Create Blogs</h1>
      <div className="max-w-3xl">
        <Tiptap />
      </div>
    </>
  );
}
