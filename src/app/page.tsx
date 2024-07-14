
const Home = () => {
  
  return (
    <main className='w-full h-full grid grid-cols-6 gap-x-2 mt-2 py-5'>
      <div className="Subject col-span-2">
        <hr></hr>
        subject
      </div>
      <div className="Content col-span-3">
        Content
      </div>
      <div className="Activity col-span-1">
        <hr />
        Activity
      </div>
    </main>
  );
}

export default Home;