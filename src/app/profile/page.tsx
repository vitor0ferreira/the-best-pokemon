
export default function Profile() {

  return (
    <main className="min-h-screen w-full bg-red-50 flex flex-col">

      <aside className="w-full bg-slate-700 text-slate-200 p-5 flex items-center gap-4">
        <div className="w-44 aspect-square bg-slate-400 rounded-full"/>
        <span className="font-bold text-xl">Name</span>
        <div className="flex flex-col items-center gap-2 bg-slate-800 p-4 font-medium">
          <span className="text-center flex items-center gap-1">
            <p>Login with:</p>
            <p className="py-1 px-1.5 bg-green-900 font-bold text-center">E-mail</p>
          </span> 
          <span className="text-center flex flex-col gap-1">
            <p>Member since:</p>
            <p className="p-0.5 bg-green-900 font-bold">12/12/2024</p>
          </span> 
        </div>
      </aside>
    
      <section className="bg-slate-600 text-slate-200 flex-1 grid grid-cols-3 grid-rows-2 place-items-center gap-3 p-3">
        <article className="bg-slate-100 w-full h-full text-black flex items-center justify-center">Most Voted Pokemon</article>
        <article className="bg-slate-100 w-full h-full text-black flex items-center justify-center">Favorite Pokemon (Automatic vote)</article>
        <article className="bg-slate-100 w-full h-full text-black flex items-center justify-center">Most Voted Pokemon Type</article>
        <article className="col-span-2 bg-slate-100 w-full h-full text-black flex items-center justify-center">Last Votes</article>
        <article className="bg-slate-100 w-full h-full text-black flex items-center justify-center">Most Voted Generation</article>
      </section>

    </main>
  )
}